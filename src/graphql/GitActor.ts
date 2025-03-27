import {hash} from 'node:crypto'
import {$Ref, FieldResolvers} from '../index.ts'

export const GitActorResolvers: FieldResolvers<'GitActor'> = {
    avatarUrl: github => (ref: $Ref<'GitActor'>) => {
        return github.get(ref)?.avatarUrl
          ?? `https:/example.com/obj/${hash('sha1', String(github.get(ref)?.email))}`
    },

    user: github => github.fieldValueOrNull(),
}
