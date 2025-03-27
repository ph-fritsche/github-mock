import {$Ref, FieldResolvers} from '../types.ts'

export const NodeResolvers: FieldResolvers<'Node'> = {
    __typename: () => (ref: $Ref) => {
        return ref.$ref.typeName
    },
}
