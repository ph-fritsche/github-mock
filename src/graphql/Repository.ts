import {RepositoryIssueOrPullRequestArgs, RepositoryObjectArgs, RepositoryRefArgs} from '@octokit/graphql-schema'
import {$Ref, FieldResolvers} from '../index.ts'

export const RepositoryResolvers: FieldResolvers<'Repository'> = {
    issueOrPullRequest: github => (repository: $Ref<'Repository'>, args: RepositoryIssueOrPullRequestArgs) => {
        return github.find(['Issue', 'PullRequest'],
            obj => obj.number === args.number && github.isSame$Ref(obj.repository, repository),
        )
    },

    object: github => (repository: $Ref<'Repository'>, args: RepositoryObjectArgs) => {
        if (args.oid) {
            return github.find(['Commit', 'Tag', 'Tree'],
                obj => obj.oid === args.oid && github.isSame$Ref(obj.repository, repository),
            ) ?? null
        } else if (args.expression) {
            return github.findObjectByExpression(repository, args.expression) ?? null
        }
        return null
    },

    ref: github => (repository: $Ref<'Repository'>, args: RepositoryRefArgs) => {
        return github.findRef(repository, args.qualifiedName)
    },
}
