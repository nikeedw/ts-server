import {
    AnyVariables,
    type Client,
    type ClientOptions,
    createClient,
    DocumentInput,
    fetchExchange,
    OperationContext,
} from '@urql/core'
import { EnvConfigs } from '../../EnvConfigs.js'

export const initTadaClient = () => {
    async function getClient({ clientOptions }: { clientOptions?: Partial<ClientOptions> }) {
        const _clientOptions = clientOptions || {}

        _clientOptions.fetchOptions = {
            ..._clientOptions.fetchOptions,
            headers: {
                'Content-Type': 'application/json',
                ['x-hasura-admin-secret']: EnvConfigs.HASURA_ADMIN_SECRET,
            },
        }

        if (!clientOptions?.url) {
            _clientOptions.url = 'http://graphql-engine:8080/v1/graphql'
        }

        _clientOptions.exchanges = [fetchExchange, ...(_clientOptions.exchanges || [])]

        _clientOptions.requestPolicy = 'network-only'

        const client = createClient(_clientOptions as ClientOptions)

        const originalQuery = client.query.bind(client)

        async function query<Data = any, Variables extends AnyVariables = AnyVariables>(
            query: DocumentInput<Data, Variables>,
            variables: Variables,
            context?: Partial<OperationContext>,
        ) {
            const res = await originalQuery(query, variables, context)
            if (res.error) {
                throw new Error(res.error.message, { ...res.error })
            }

            return res
        }

        async function mutation<Data = any, Variables extends AnyVariables = AnyVariables>(
            query: DocumentInput<Data, Variables>,
            variables: Variables,
            context?: Partial<OperationContext>,
        ) {
            const res = await client.mutation(query, variables, context)
            if (res.error) {
                throw new Error(res.error.message, { ...res.error })
            }

            return res
        }

        return { client, query, mutation }
    }

    return { getClient }
}

export type KeyOf<T, K extends keyof NonNullable<T>> = NonNullable<T>[K]
