import {$Ref, FieldResolvers} from '../index.ts'

export const CommitResolvers: FieldResolvers<'Commit'> = {
    associatedPullRequests: github => github.relayStylePagination(),

    authors: github => github.relayStylePagination(),

    abbreviatedOid: github => (ref: $Ref) => {
        const oid = github.store.get(ref, 'oid') as string
        return oid.substring(0, 7)
    },
}
