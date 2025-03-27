import {RefCompareArgs} from '@octokit/graphql-schema'
import {$Ref, FieldResolvers} from '../index.ts'

export const RefResolvers: FieldResolvers<'Ref'> = {
    compare: github => (baseRef: $Ref<'Ref'>, args: RefCompareArgs) => {
        const baseTarget = github.store.get(baseRef, 'target')
        const repository = github.store.get(baseRef, 'repository') as $Ref<'Repository'>
        const headRef = github.findRef(repository, args.headRef)
        if (!headRef) {
            return null
        }
        const headTarget = github.store.get(headRef, 'target')
        return github.find(['Comparison'],
            obj => github.isSame$Ref(obj.baseTarget, baseTarget) && github.isSame$Ref(obj.headTarget, headTarget),
        )
    },
}
