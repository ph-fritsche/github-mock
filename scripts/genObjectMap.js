#!/usr/bin/env node

import {Kind, parse} from 'graphql'
import {schema} from '@octokit/graphql-schema'
import {writeFile} from 'node:fs/promises'
import {resolve} from 'node:path'

let out = `// Auto-generated -- do not modify
import * as Schema from '@octokit/graphql-schema'

`

const doc = parse(schema.idl)

const graphqlNames = []

out += `export type StoreObjectMap = {\n`
for (const def of doc.definitions) {
    if (def.kind === Kind.OBJECT_TYPE_DEFINITION) {
        if (def.name.value === 'Query' || def.name.value === 'Mutation') {
            continue
        }
        if (def.name.value.endsWith('Connection')
          || def.name.value.endsWith('Edge')
          || def.name.value.endsWith('Input')
          || def.name.value.endsWith('Parameters')
          || def.name.value.endsWith('Payload')
        ) {
            continue
        }

        const graphqlTypename = def.name.value
        graphqlNames.push(graphqlTypename)

        const typescriptName = def.name.value
            .replaceAll(/[A-Z]{2,}$/g, s => s[0] + s.slice(1).toLowerCase())
            .replaceAll(/[A-Z]{2,}[a-z]/g, s => s[0] + s.slice(1, -2).toLowerCase() + s.slice(-2))

        out += `    '${graphqlTypename}': Schema.${typescriptName}\n`
    }
}
out += `}\n`

out += `export const StoreObjectTypes = [\n`
for (const n of graphqlNames) {
    out += `    '${n}',\n`
}
out += `] as const\n`

await writeFile(resolve(import.meta.dirname, '../src/schema/StoreObject.ts'), out)
