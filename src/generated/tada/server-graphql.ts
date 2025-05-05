import { initGraphQLTada } from 'gql.tada'
import type { introspection } from './server-graphql-env'
import { initTadaClient } from '@tada-client'

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

export const { getClient: getTadaServerClient, createTadaClient: createTadaServerClient } = initTadaClient()

export type { FragmentOf, ResultOf, VariablesOf } from 'gql.tada'
export { readFragment } from 'gql.tada'
