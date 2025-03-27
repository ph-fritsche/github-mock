import {defaultFetchMockConfig, FetchMock} from 'fetch-mock'
import {addMocksToSchema, MockStore} from '@graphql-tools/mock'
import {makeExecutableSchema} from '@graphql-tools/schema'
import {schema} from '@octokit/graphql-schema'
import {GithubEndpoints} from './GithubEndpoints.ts'
import {GithubMockConfig} from './GithubMockConfig.ts'
import {GithubStore} from './GithubStore.ts'
import {CommitResolvers} from './graphql/Commit.js'
import {ComparisonResolvers} from './graphql/Comparison.js'
import {GitActorResolvers} from './graphql/GitActor.ts'
import {MutationResolvers} from './graphql/Mutation.ts'
import {NodeResolvers} from './graphql/Node.ts'
import {PullRequestResolvers} from './graphql/PullRequest.ts'
import {QueryResolvers} from './graphql/Query.ts'
import {RefResolvers} from './graphql/Ref.ts'
import {UserResolvers} from './graphql/User.ts'
import {RepositoryResolvers} from './graphql/Repository.ts'
import {reposContentsGet} from './rest/repos/contents.ts'
import {usersGet} from './rest/users.ts'
import {simpleUser} from './components/simple-user.ts'
import {publicUser} from './components/public-user.ts'

export type {
    $Ref,
    StorableObjectProps,
    StoreObjectType,
    StoreObjectProps,
    RestEndpoint,
    RestSchemaComponent,
    FieldResolvers,
    FileContents,
} from './types.ts'

export {HttpError} from './GithubEndpoints.ts'

export type {GithubStore}

const originalSchema = makeExecutableSchema({typeDefs: schema.idl})

function createGithubMock(
    configure?: (config: GithubMockConfig) => void,
) {
    const {
        config,
        mocks,
        fieldResolvers,
        restEndpoints,
        restSchemaComponents,
    } = GithubMockConfig.createConfig()

    config.setFieldResolvers('Commit', CommitResolvers)
    config.setFieldResolvers('Comparison', ComparisonResolvers)
    config.setFieldResolvers('GitActor', GitActorResolvers)
    config.setFieldResolvers('Mutation', MutationResolvers)
    config.setFieldResolvers('Node', NodeResolvers)
    config.setFieldResolvers('PullRequest', PullRequestResolvers)
    config.setFieldResolvers('Query', QueryResolvers)
    config.setFieldResolvers('Ref', RefResolvers)
    config.setFieldResolvers('Repository', RepositoryResolvers)
    config.setFieldResolvers('User', UserResolvers)

    config.setRestEndpoint('GET /repos/{owner}/{repo}/contents/{path}', reposContentsGet)
    config.setRestEndpoint('GET /users/{username}', usersGet)

    config.setRestSchemaComponent('public-user', publicUser)
    config.setRestSchemaComponent('simple-user', simpleUser)

    configure?.(config)

    const mockStore = new MockStore({
        schema: originalSchema,
        mocks,
    })

    const store = new GithubStore(
        mockStore,
        (github, schema) => {
            const resolvers = {}
            for (const t in fieldResolvers) {
                for (const f in fieldResolvers[t]) {
                    resolvers[t] ??= {}
                    resolvers[t][f] = fieldResolvers[t][f]?.(github)
                }
            }

            return addMocksToSchema({
                schema,
                store: mockStore,
                preserveResolvers: true,
                resolvers,
            })
        },
        restSchemaComponents,
    )

    const endpoints = new GithubEndpoints(store, restEndpoints)

    const fetchMock = new FetchMock({
        ...defaultFetchMockConfig,
    })

    for (const {name, match, handle} of endpoints.routes()) {
        fetchMock.route({
            name,
            matcherFunction: (callLog) => match(
                callLog.options.method ?? 'GET',
                new URL(callLog.url),
            ),
            response: async (callLog) => {
                const octokitRes = await handle(
                    callLog.options.method ?? 'GET',
                    new URL(callLog.url),
                    new Headers(callLog.options.headers),
                    // eslint-disable-next-line @typescript-eslint/no-base-to-string
                    String(callLog.options.body),
                )
                if (!octokitRes) {
                    return new Response(null, {status: 404})
                }
                const res = new Response(
                    octokitRes.data ? JSON.stringify(octokitRes.data) : null,
                    {status: octokitRes.status},
                )
                res.headers.set('content-type', 'application/json; charset=utf-8')
                for (const [key, value] of Object.entries(octokitRes.headers)) {
                    if (value !== undefined) {
                        res.headers.set(key, String(value))
                    }
                }
                return res
            },
        })
    }

    return {
        fetch: fetchMock.fetchHandler.bind(fetchMock) as OmitThisParameter<FetchMock['fetchHandler']>,
        graphql: endpoints.graphql.bind(endpoints) as GithubGraphQLEndpoint,
        store,
    }
}

export type GithubGraphQLEndpoint = OmitThisParameter<GithubEndpoints['graphql']>

export function createAppWithGithubMock<App>(
    createApp: (fetch: OmitThisParameter<FetchMock['fetchHandler']>) => App,
    configureMock?: (config: GithubMockConfig) => void,
) {
    return (setup?: (store: GithubStore) => void) => {
        const mock = createGithubMock(configureMock)

        setup?.(mock.store)

        return [
            createApp(mock.fetch),
            mock,
        ] as const
    }
}
