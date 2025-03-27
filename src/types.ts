import * as Schema from '@octokit/graphql-schema'
import {Endpoints} from '@octokit/types'
import {components} from '@octokit/openapi-types'
import {IFieldResolver} from '@graphql-tools/utils'
import {GithubStore} from './GithubStore.ts'
import {StoreObjectMap} from './schema/StoreObject.ts'

export type $Ref<T extends string = string> = {'$ref': {typeName: T, key: string}}
export type $RefType<R extends $Ref> = R extends {'$ref': {typeName: infer T, key: string}} ? T : never
export type $RefFor<O> = $Ref<O extends {__typename?: infer T extends string} ? T : never>
export type $RefUnion<T extends string = string> = {[k in T]: $Ref<k>}[T]

export type Scalar = string | number | boolean | null | undefined

export type ScalarProps<O extends object> = {
    [L in {[K in keyof O]: O[K] extends Scalar ? K : never}[keyof O]]: O[L]
}

type $RefForOrArray<P> = P extends ((infer T)[] | null | undefined)
    ? $RefFor<T>[] | null | undefined
    : $RefFor<P> | null | undefined

export type $RefProps<O extends object> = {
    [L in {[K in keyof O]: NonAny<O[K]> extends Scalar ? never : K}[keyof O]]?:
    $RefForOrArray<O[L]>
}

export type StorableObject = {__typename?: string}
export type StorableObjectType<O extends StorableObject> = O extends {__typename?: infer T} ? T : never

export type StorableObjectProps<O> = {
    [K in Exclude<keyof O, '__typename' | 'id'>]?:
    O[K] extends {__typename?: infer T extends string}[] | null | undefined
        ? null | undefined | Array<$Ref<T> | (O[K] extends (infer P)[] | null | undefined ? StorableObjectProps<P> : never)>
        : O[K] extends {__typename?: infer U extends string} | null | undefined
            ? $Ref<U> | null | undefined | StorableObjectProps<O[K]>
            : O[K]
}

type StoreValue<V> = V extends {__typename?: infer T extends string}[]
    ? $Ref<T>[]
    : V extends {__typename?: infer U extends string}
        ? $Ref<U>
        : V

export type StoreObject<O extends StorableObject> = {
    [K in Exclude<KeyofUnion<O>, '__typename' | 'id'>]?: StoreValue<ValueofUnion<O, K>>
}

export {StoreObjectMap}

export type StoreObjectType = keyof StoreObjectMap

export type StoreObjectProps<T extends keyof StoreObjectMap> = StoreObject<StoreObjectMap[T]>

export type PartialScalarProps<T extends keyof StoreObjectMap> = Partial<ScalarProps<StoreObjectMap[T]>>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _uniqueSymbol = Symbol()
type NonAny<T> = (T extends typeof _uniqueSymbol ? 1 : 2) extends 2 ? T : never

type KeyofUnion<T> = T extends T ? keyof T : never
type ValueofUnion<T, K> = T extends T ? K extends keyof T ? T[K] : undefined : never

export type StoreObjectAndMeta = StoreObjectMap & {
    Query: Schema.Query
    Mutation: Schema.Mutation
} & {[k: string]: {[k: string]: unknown}}

export type FieldResolverReturn<
    T extends keyof StoreObjectAndMeta,
    F extends keyof StoreObjectAndMeta[T],
> = StoreObjectAndMeta[T][F] extends {__typename?: infer U extends string}
    ? ($Ref<U> | StorableObjectProps<StoreObjectAndMeta[T][F]>)
    : StoreObjectAndMeta[T][F] extends {__typename?: infer V extends string} | null | undefined
        ? ($Ref<V> | StorableObjectProps<StoreObjectAndMeta[T][F]> | null | undefined)
        : StoreObjectAndMeta[T][F]

export type FieldResolver<
    T extends keyof StoreObjectAndMeta,
    F extends keyof StoreObjectAndMeta[T],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = (github: GithubStore) => IFieldResolver<any, any, Record<string, any>, FieldResolverReturn<T, F>>

export type FieldResolvers<T extends keyof StoreObjectAndMeta> = {
    [k in keyof StoreObjectAndMeta[T]]?: FieldResolver<T, k>
}

export type FileContents = {[filePath: string]: string | null | undefined}

export type RestEndpoint<
    K extends keyof Endpoints,
> = (github: GithubStore) => (
    params: Endpoints[K]['parameters'],
) => Promise<Endpoints[K]['response']['data']>

export type RestSchemaComponent<
    K extends keyof components['schemas'],
> = (github: GithubStore) => (
    $ref: $Ref,
) => components['schemas'][K]
