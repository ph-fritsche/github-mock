import {MutationCreateCommitOnBranchArgs} from '@octokit/graphql-schema'
import {$Ref, FieldResolvers, FileContents} from '../index.ts'

export const MutationResolvers: FieldResolvers<'Mutation'> = {
    createCommitOnBranch: github => (_ref: $Ref, {input}: MutationCreateCommitOnBranchArgs) => {
        let ref: $Ref<'Ref'> | undefined
        if (input.branch.id) {
            ref = github.findId(['Ref'], input.branch.id)
        } else {
            const repository = github.find(['Repository'],
                obj => obj.nameWithOwner === input.branch.repositoryNameWithOwner,
            )
            if (!repository) {
                throw new Error('Could not find repository')
            }
            ref = github.find(['Ref'],
                obj => obj.name === input.branch.branchName && github.isSame$Ref(obj.repository, repository),
            )
        }
        const refObj = ref && github.get(ref)
        if (!ref || !github.is$RefType(refObj?.repository, 'Repository') || !github.is$RefType(refObj?.target, 'Commit')) {
            throw new Error('Not a committable branch')
        }
        const head = github.get(refObj.target)
        if (head?.oid !== input.expectedHeadOid) {
            throw new Error('Branch head moved')
        }
        const files: FileContents = {}
        for (const f of input.fileChanges?.additions ?? []) {
            files[f.path] = Buffer.from(f.contents, 'base64').toString()
        }
        for (const f of input.fileChanges?.deletions ?? []) {
            files[f.path] = null
        }
        const newTree = github.updateTree(
            head?.tree ?? refObj.repository,
            files,
        )
        const commit = github.addCommit({
            authors: [],
            repository: refObj.repository,
            message: [
                input.message.headline,
                input.message.body,
            ].join('\n\n'),
            tree: newTree,
        })
        github.store.set(commit, {parents: {nodes: [refObj.target]}})
        github.store.set(ref, 'target', commit)

        return {
            clientMutationId: input.clientMutationId,
            ref,
            commit,
        }
    },
}
