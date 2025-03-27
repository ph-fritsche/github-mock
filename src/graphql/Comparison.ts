import {FieldResolvers} from '../index.ts'

export const ComparisonResolvers: FieldResolvers<'Comparison'> = {
    commits: github => github.relayStylePagination(),
}
