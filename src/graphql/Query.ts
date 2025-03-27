import {QueryNodeArgs, QueryRepositoryArgs} from '@octokit/graphql-schema'
import {FieldResolvers} from '../index.ts'
import {StoreObjectTypes} from '../schema/StoreObject.ts'

export const QueryResolvers: FieldResolvers<'Query'> = {
    node: github => (_ref: undefined, args: QueryNodeArgs) => {
        return github.findId(
            StoreObjectTypes,
            args.id,
        )
    },

    rateLimit: () => () => ({cost: 1}),

    repository: github => (_ref: undefined, args: QueryRepositoryArgs) => {
        const owner = github.find(
            ['Organization', 'User'],
            (obj) => obj.login === args.owner,
        )
        return owner && github.find(
            ['Repository'],
            (obj) => obj.name === args.name && github.isSame$Ref(obj.owner, owner),
        )
    },
}
