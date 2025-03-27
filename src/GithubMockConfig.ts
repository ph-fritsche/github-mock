import {IMocks} from '@graphql-tools/mock'
import {Endpoints} from '@octokit/types'
import {components} from '@octokit/openapi-types'
import {FieldResolver, RestEndpoint, RestSchemaComponent, StoreObjectAndMeta} from './types.ts'

export class GithubMockConfig {
    static createConfig() {
        const config = new GithubMockConfig()

        return {
            config,
            mocks: config.mocks,
            fieldResolvers: config.fieldResolvers,
            restEndpoints: config.restEndpoints,
            restSchemaComponents: config.restSchemaComponents,
        }
    }

    protected readonly mocks: IMocks = {
        URI: () => genFakeUri(),
        GitObjectID: () => genFakeOid(),
    }

    protected readonly fieldResolvers: {
        [objectType in keyof StoreObjectAndMeta]?: {
            [fieldName in keyof StoreObjectAndMeta[objectType]]?: FieldResolver<objectType, fieldName>
        }
    } = {}

    protected readonly restEndpoints: {
        [k in keyof Endpoints]?: RestEndpoint<k>
    } = {}

    protected readonly restSchemaComponents: {
        [Type in keyof components['schemas']]?: RestSchemaComponent<Type>
    } = {}

    setMockValueGenerator<T>(
        typeName: string,
        generate: () => T,
    ) {
        this.mocks[typeName] = generate
    }

    setFieldResolvers<
        T extends keyof StoreObjectAndMeta,
    >(
        objectName: T,
        resolvers: {[F in keyof StoreObjectAndMeta[T]]?: FieldResolver<T, F>},
    ) {
        this.fieldResolvers[objectName] ??= {}
        Object.assign(this.fieldResolvers[objectName], resolvers)
    }

    setRestEndpoint<
        K extends keyof Endpoints,
    >(
        key: K,
        impl: RestEndpoint<K>,
    ) {
        Object.assign(this.restEndpoints, {[key]: impl})
    }

    setRestSchemaComponent<
        T extends keyof components['schemas'],
    >(
        type: T,
        impl: RestSchemaComponent<T>,
    ) {
        Object.assign(this.restSchemaComponents, {[type]: impl})
    }
}

export function genFakeUri(
    prefix = 'mock',
    id = genFakeOid(),
) {
    return `https://example.com/${prefix}/${id}`
}

export function genFakeOid() {
    let oid = ''
    for (; oid.length < 32;) {
        oid += Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0')
    }
    return oid
}
