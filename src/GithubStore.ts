import {hash} from 'node:crypto'
import {GraphQLSchema} from 'graphql/index.js'
import {PageInfo} from '@octokit/graphql-schema'
import {components} from '@octokit/openapi-types'
import {isRef, MockStore, RelayPaginationParams} from '@graphql-tools/mock'
import {GraphQLResolveInfo} from '@graphql-tools/utils'
import {$Ref, PartialScalarProps, StoreObjectType, StoreObjectProps, FileContents, $RefUnion, RestSchemaComponent} from './types.ts'

export class GithubStore {
    constructor(
        readonly store: MockStore,
        addResolvers: (store: GithubStore, schema: GraphQLSchema) => GraphQLSchema,
        protected readonly restSchemaComponents: {
            [k in keyof components['schemas']]?: RestSchemaComponent<k>
        },
        readonly apiOrigin = 'https://api.github.com',
        readonly htmlOrigin = 'https://github.com',
        readonly contentOrigin = 'https://raw.githubusercontent.com',
        readonly avatarsOrigin = 'https://avatars.githubusercontent.com',
    ) {
        this.schema = addResolvers(this, store.schema)
    }

    readonly schema: GraphQLSchema

    protected get storeAsRecord() {
        return (this.store as unknown as {store: {[typeName: string]: undefined | {[id: string]: | {[prop: string]: unknown}}}})
            .store
    }

    is$RefType<T extends string>(
        ref: unknown,
        type: T | readonly T[],
    ): ref is $RefUnion<T> {
        return isRef(ref) && (Array.isArray(type)
            ? type.some(t => t === ref.$ref.typeName)
            : type === ref.$ref.typeName
        )
    }

    isSame$Ref(a: unknown, b: unknown) {
        return isRef(a) && isRef(b) && a.$ref.typeName === b.$ref.typeName && a.$ref.key === b.$ref.key
    }

    mk$Ref<T extends string>(
        typeName: T,
        key = this.genId(),
    ): $Ref<T> {
        return {$ref: {typeName, key}}
    }

    with$RefType<
        T extends StoreObjectType,
        R,
    >(
        type: T | readonly T[],
        handler: (
            data: StoreObjectProps<T>,
            ref: $RefUnion<T>,
        ) => R,
        error?: () => never,
    ) {
        return (ref: unknown): R => {
            if (this.is$RefType(ref, type)) {
                const data = this.get(ref)
                if (data) {
                    return handler(data, ref)
                }
            }
            if (error) {
                return error?.()
            }
            throw new Error(`Expected one of ${JSON.stringify(type)} - got ${isRef(ref) ? ref.$ref.typeName : typeof ref}`)
        }
    }

    has<T extends StoreObjectType>(ref: $Ref<T> | null | undefined) {
        return !!this.get(ref)
    }

    get<T extends StoreObjectType>(ref: $Ref<T> | null | undefined) {
        return ref && this.storeAsRecord[ref.$ref.typeName]?.[ref.$ref.key] as (
            StoreObjectProps<T> | undefined
        )
    }

    set<T extends StoreObjectType>(
        ref: $Ref<T>,
        props: StoreObjectProps<T>,
    ) {
        this.store.set(ref, props)
    }

    create<
        Type extends StoreObjectType,
        Props extends StoreObjectProps<Type>,
    >(
        typeName: Type,
        props: Props,
    ): $Ref<Type> {
        const ref = this.mk$Ref(typeName)
        this.store.set(ref, props)
        return ref
    }

    getComponent<
        Type extends keyof components['schemas'],
    >(
        type: Type,
        ref: $Ref,
    ): components['schemas'][Type] {
        if (!this.restSchemaComponents[type]) {
            throw new Error(`Missing implementation for component "${type}"`)
        }

        return this.restSchemaComponents[type](this)(ref)
    }

    genId() {
        let id = ''
        for (; id.length < 8;) {
            id += String.fromCharCode(Math.random() * 256)
        }
        return Buffer.from(id).toString('base64')
    }

    genOid() {
        let oid = ''
        for (; oid.length < 32;) {
            oid += Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0')
        }
        return oid
    }

    genUrl(
        prefix = 'mock',
        id = this.genOid(),
    ) {
        return `https://example.com/${prefix}/${id}`
    }

    findAll<T extends StoreObjectType>(
        typeNames: readonly T[],
        predicate: (obj: StoreObjectProps<T>, typeName: T, id: string) => boolean,
        count?: number,
    ) {
        const refs: $RefUnion<T>[] = []
        const store = this.storeAsRecord
        for (const typeName of typeNames) {
            for (const [key, obj] of Object.entries(store[typeName] ?? {})) {
                if (predicate(obj as StoreObjectProps<T>, typeName, key)) {
                    refs.push({'$ref': {typeName, key}})
                    if (count && refs.length >= count) {
                        return refs
                    }
                }
            }
        }
        return refs
    }

    findId<T extends StoreObjectType>(
        typeNames: readonly T[],
        id: string,
    ) {
        return this.findAll(typeNames, (obj, typeName, id_) => id_ === id, 1).at(0)
    }

    find<T extends StoreObjectType>(
        typeNames: readonly T[],
        predicate: (obj: StoreObjectProps<T>, typeName: T, id: string) => boolean,
    ) {
        return this.findAll(typeNames, predicate, 1).at(0)
    }

    findRepository(
        owner: $Ref<'Organization'> | $Ref<'User'> | string | undefined,
        name: string,
    ) {
        if (typeof owner === 'object') {
            owner = this.get(owner)?.login
        }
        if (!owner) {
            return undefined
        }
        return this.find(['Repository'], obj => obj.nameWithOwner === `${owner?.toLowerCase()}/${name.toLowerCase()}`)
    }

    findRef(
        repository: $Ref<'Repository'> | undefined,
        name: string,
    ) {
        return this.find(['Ref'], obj => !!obj.prefix && !!obj.name && obj.prefix + obj.name === name && this.isSame$Ref(obj.repository, repository))
          ?? this.find(['Ref'], obj => obj.name === name && this.isSame$Ref(obj.repository, repository))
    }

    findObjectByExpression(
        repository: $Ref<'Repository'>,
        expression: string,
    ) {
        const [ref, path] = expression.split(':', 2)
        const refRef = this.findRef(repository, ref)
        if (!refRef) {
            return undefined
        }
        const target = this.get(refRef)?.target
        if (this.is$RefType(target, 'Commit')) {
            const tree = this.get(target)?.tree
            if (tree) {
                const entry = this.getTreeEntryFromTree(tree, path)
                if (entry) {
                    return this.get(entry)?.object
                }
            }
        }
    }

    getTreeEntry(
        obj: $Ref<'Ref'> | $Ref<'Tag'> | null | undefined,
        path?: string,
    ) {
        const target = this.resolveRefTarget(obj)
        if (this.is$RefType(target, 'Blob')) {
            return undefined
        }
        const tree = this.is$RefType(target, 'Tree')
            ? target
            : this.get(target)?.tree
        return this.getTreeEntryFromTree(tree, path ?? '')
    }

    resolveRefTarget(
        obj: $Ref<'Ref'> | $Ref<'Tag'> | null | undefined,
    ) {
        for (
            let t = this.get(obj)?.target, loopPrevent = {};
            t && !loopPrevent[t.$ref.key];
            loopPrevent[t.$ref.key] = true
        ) {
            if (this.is$RefType(t, ['Blob', 'Commit', 'Tree'])) {
                return t
            }
        }
    }

    fieldValueOrNull<T>() {
        return (ref: $Ref, args: unknown, ctx: unknown, info: GraphQLResolveInfo) => {
            return (this.storeAsRecord[ref.$ref.typeName]?.[ref.$ref.key]?.[info.fieldName] ?? null) as T
        }
    }

    relayStylePagination<T>() {
        return (ref: $Ref, args: RelayPaginationParams, ctx: unknown, info: GraphQLResolveInfo) => {
            const store = this.storeAsRecord
            const connectionRef = store[ref.$ref.typeName]?.[ref.$ref.key]?.[info.fieldName]
            const connectionObj = isRef(connectionRef)
                ? store[connectionRef.$ref.typeName]?.[connectionRef.$ref.key] ?? {}
                : {}

            const allNodes: NonNullable<T>[] = 'nodes' in connectionObj && Array.isArray(connectionObj.nodes) ? connectionObj.nodes : []

            const frameStart = 1 + Math.max(-1, this.numberFromCursor(args.after) ?? -1)
            const frameEnd = Math.max(0, this.numberFromCursor(args.before) ?? allNodes.length)
            const sliceStart = Math.max(0, args.last ? frameEnd - args.last : frameStart)
            const sliceEnd = Math.min(allNodes.length, args.first ? frameStart + args.first : frameEnd)

            const pageInfo: PageInfo = {
                __typename: 'PageInfo',
                hasPreviousPage: sliceStart > 0,
                hasNextPage: sliceEnd < allNodes.length,
                startCursor: sliceStart > 0 ? this.numberToCursor(sliceStart) : null,
                endCursor: sliceEnd < allNodes.length ? this.numberToCursor(sliceEnd - 1) : null,
            }
            const edges: Array<{cursor: string, node: NonNullable<T>}> = []
            if (allNodes[sliceStart]) {
                edges.push({cursor: this.numberToCursor(sliceStart), node: allNodes[sliceStart]})
            }
            if (sliceEnd !== sliceStart + 1 && allNodes[sliceEnd - 1]) {
                edges.push({cursor: this.numberToCursor(sliceEnd - 1), node: allNodes[sliceEnd - 1]})
            }

            return {
                edges,
                pageInfo,
                nodes: allNodes.slice(sliceStart, sliceEnd),
                totalCount: allNodes.length,
            }
        }
    }

    protected numberToCursor(i: number) {
        return Buffer.from(String(i)).toString('base64')
    }

    protected numberFromCursor(c?: string) {
        const n = c ? Number(Buffer.from(c, 'base64').toString('utf8')) : undefined
        return Number.isInteger(n) ? n : undefined
    }

    protected getTreeEntryFromTree(
        tree: $Ref<'Tree'> | undefined,
        path: string,
    ) {
        const parts = path.split('/')
        for (let i = 0; parts[i]; i++) {
            for (const entryRef of this.get(tree)?.entries ?? []) {
                const name = this.get(entryRef)?.name
                if (name !== parts[i]) {
                    continue
                }
                if (i === parts.length - 1) {
                    return entryRef
                }
                const obj = this.get(entryRef)?.object
                if (this.is$RefType(obj, 'Tree')) {
                    tree = obj
                    break
                } else {
                    return
                }
            }
        }
    }

    updateTree(
        treeOrRepository: $Ref<'Tree'> | $Ref<'Repository'>,
        files: FileContents,
    ) {
        type GitTree = {
            $ref: $Ref<'Tree'>
            parent?: GitTreeEntry
            path: string
            props: StoreObjectProps<'Tree'>
        }
        type GitTreeEntry = {
            $ref: $Ref<'TreeEntry'>
            tree: GitTree
            path: string
            props: StoreObjectProps<'TreeEntry'>
        }
        const entryRecord: {[k: string]: GitTreeEntry} = {}
        const treeRecord: {[k: string]: GitTree} = {}

        const repository = this.is$RefType(treeOrRepository, 'Repository')
            ? treeOrRepository
            : this.store.get(treeOrRepository, 'repository') as $Ref<'Repository'>
        const baseTreeRef = this.is$RefType(treeOrRepository, 'Tree')
            ? treeOrRepository
            : this.mk$Ref('Tree')
        const root: GitTree = {
            $ref: baseTreeRef,
            path: '',
            props: structuredClone(this.get(baseTreeRef)) ?? {},
        }

        for (const [filePath, contents] of Object.entries(files)) {
            if (contents === undefined) {
                continue
            }
            const parts = filePath.split('/')

            let tree = root
            tree.$ref = this.mk$Ref('Tree')
            treeRecord[''] = tree

            for (let i = 0; i < parts.length; i++) {
                const path = parts.slice(0, i + 1).join('/')
                const name = parts[i]
                if (!entryRecord[path]) {
                    const newRef = this.mk$Ref('TreeEntry')
                    entryRecord[path] = {$ref: newRef, tree, path, props: {}}

                    tree.props.entries ??= []
                    const i = tree.props.entries.findIndex(e => this.get(e)?.name === name)
                    if (i >= 0) {
                        const oldRef = tree.props.entries[i]
                        entryRecord[path].props = structuredClone(this.get(oldRef)) ?? {}
                        tree.props.entries.splice(i, 1, newRef)
                    } else {
                        tree.props.entries.push(newRef)
                    }
                    tree.props.oid = hash('sha1', JSON.stringify(tree.props.entries))
                    if (tree.parent) {
                        tree.parent.props.oid = tree.props.oid
                    }
                    entryRecord[path].props.path = path
                    entryRecord[path].props.name = name
                }
                if (i < parts.length - 1) {
                    const objRef = entryRecord[path].props.object
                    if (!treeRecord[path]) {
                        treeRecord[path] = {
                            $ref: this.mk$Ref('Tree'),
                            parent: entryRecord[path],
                            path,
                            props: (this.is$RefType(objRef, 'Tree') && structuredClone(this.get(objRef))) || {},
                        }
                    }
                    tree = treeRecord[path]
                    entryRecord[path].props.object = tree.$ref
                } else if (contents === null) {
                    for (let e: GitTreeEntry | undefined = entryRecord[path]; e; e = e.tree.parent) {
                        delete entryRecord[e.path]
                        e.tree.props.entries = e.tree.props.entries?.filter(f => f === e.$ref)
                        if (e.tree.props.entries?.length) {
                            e.tree.props.oid = hash('sha1', JSON.stringify(e.tree.props.entries))
                            break
                        } else if (e.tree.parent) {
                            delete treeRecord[e.tree.path]
                        }
                    }
                } else {
                    const oid = hash('sha1', contents)
                    const blob = this.create('Blob', {
                        repository,
                        oid,
                        text: contents,
                    })
                    entryRecord[path].props.object = blob
                    entryRecord[path].props.oid = oid
                }
            }
        }
        for (const el of Object.values(entryRecord)) {
            this.set(el.$ref, el.props)
        }
        for (const el of Object.values(treeRecord)) {
            this.set(el.$ref, el.props)
        }
        return root.$ref
    }

    #databaseId = 123456
    addUser({
        ...data
    }: PartialScalarProps<'User'> & {
        login: string
    }) {
        data.databaseId ??= this.#databaseId++
        return this.create('User', data)
    }

    addOrganization(
        data: PartialScalarProps<'Organization'>,
    ) {
        return this.create('Organization', data)
    }

    addBot(
        data: PartialScalarProps<'Bot'>,
    ) {
        return this.create('Bot', data)
    }

    addRepository({
        ...data
    }: PartialScalarProps<'Repository'> & {
        owner: $Ref<'User'> | $Ref<'Organization'>
        name: string
    }) {
        const ownerIdent = this.get(data.owner)?.login
        data.nameWithOwner = `${ownerIdent}/${data.name}`

        return this.create('Repository', data)
    }

    addTag({
        repository,
        ...data
    }: PartialScalarProps<'Tag'> & {
        name: string
        repository: $Ref<'Repository'>
        target?: $Ref<'Tag'> | $Ref<'Commit'>
    }) {
        data.target ??= this.mk$Ref('Commit')

        const ref = this.create('Tag', data)

        this.store.set(ref, {repository})

        const refRef = this.create('Ref', {
            name: data.name,
            prefix: 'refs/tags/',
        })

        this.store.set(refRef, {repository, target: ref})

        return ref
    }

    addCommit({
        authors,
        associatedPullRequests,
        ...data
    }: PartialScalarProps<'Commit'> & {
        authors: Array<{
            name: string
            email: string
            user?: $Ref<'User'>
        }>
        repository: $Ref<'Repository'>
        associatedPullRequests?: $Ref<'PullRequest'>[]
        tree?: $Ref<'Tree'>
    }) {
        data.oid ??= hash('sha1', JSON.stringify([
            data.message,
            authors.map(({name, email}) => ({name, email})),
        ]))

        const ref = this.create('Commit', data)

        this.store.set(ref, {
            authors: {nodes: authors},
            associatedPullRequests: associatedPullRequests ? {nodes: associatedPullRequests} : undefined,
        })

        return ref
    }

    addTree({
        repository,
        files,
    }: {
        repository: $Ref<'Repository'>
        files: FileContents
    }) {
        return this.updateTree(repository, files)
    }

    addComparison({
        baseTarget,
        headTarget,
        commits,
        ...data
    }: PartialScalarProps<'Comparison'> & {
        baseTarget: $Ref<'Tag' | 'Commit'>
        headTarget: $Ref<'Tag' | 'Commit'>
        commits: Array<$Ref<'Commit'>>
    }) {
        data.behindBy ??= data.aheadBy ? commits.length - data.aheadBy : 0
        data.aheadBy ??= commits.length - data.behindBy
        data.status ??= data.aheadBy
            ? data.behindBy ? 'DIVERGED' : 'AHEAD'
            : data.behindBy ? 'BEHIND' : 'IDENTICAL'

        const ref = this.create('Comparison', data)

        this.store.set(ref, {
            baseTarget,
            headTarget,
            commits: {nodes: commits},
        })

        return ref
    }

    addPullRequest({
        closingIssuesReferences,
        ...data
    }: PartialScalarProps<'PullRequest'> & {
        repository: $Ref<'Repository'>
        author?: $Ref<'Bot'> | $Ref<'EnterpriseUserAccount'> | $Ref<'Mannequin'> | $Ref<'Organization'> | $Ref<'User'>
        closingIssuesReferences?: $Ref<'Issue'>[]
    }) {
        const ref = this.create('PullRequest', data)

        this.store.set(ref, {
            closingIssuesReferences: closingIssuesReferences ? {nodes: closingIssuesReferences} : undefined,
        })

        return ref
    }

    addIssue({
        ...data
    }: PartialScalarProps<'Issue'> & {
        repository: $Ref<'Repository'>
        author?: $Ref<'Bot'> | $Ref<'EnterpriseUserAccount'> | $Ref<'Mannequin'> | $Ref<'Organization'> | $Ref<'User'>
    }) {
        return this.create('Issue', data)
    }

    addBranch({
        isDefault,
        ...data
    }: Omit<PartialScalarProps<'Ref'>, 'prefix'> & {
        repository: $Ref<'Repository'>
        target: $Ref<'Commit'>
        isDefault?: boolean
    }) {
        const ref = this.create('Ref', {
            ...data,
            prefix: 'refs/heads/',
        })

        if (isDefault) {
            this.set(data.repository, {defaultBranchRef: ref})
        }

        return ref
    }
}
