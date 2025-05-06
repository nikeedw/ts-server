import { initGraphQLTada } from 'gql.tada'
import type { introspection } from './server-graphql-env.js'
import { initTadaClient } from '../tada/initTadaClient.js'

export type IUUID = `${string}-${string}-${string}-${string}-${string}`

export const graphql = initGraphQLTada<{
    introspection: introspection
    scalars: {
        uuid: IUUID
        timestamptz: string
        citext: string
        bpchar: string
        bigint: number
        smallint: number
        date: string
        jsonb: unknown
    }
}>()

export const { getClient } = initTadaClient()

export const getTadaServerClient = () => getClient({})

export type { FragmentOf, ResultOf, VariablesOf } from 'gql.tada'
export { readFragment } from 'gql.tada'
