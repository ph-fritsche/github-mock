import {FieldResolvers} from '../types.ts'

export const PullRequestResolvers: FieldResolvers<'PullRequest'> = {
    closingIssuesReferences: github => github.relayStylePagination(),
}
