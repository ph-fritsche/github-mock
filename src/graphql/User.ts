import {$Ref, FieldResolvers} from '../index.ts'

export const UserResolvers: FieldResolvers<'User'> = {
    avatarUrl: github => (ref: $Ref<'User'>) => {
        return github.get(ref)?.avatarUrl ?? github.genUrl('avatar', github.get(ref)?.login)
    },

    name: github => github.fieldValueOrNull(),
}
