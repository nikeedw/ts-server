import { getTadaServerClient, graphql, VariablesOf } from '../../generated/tada/server-graphql.js'

const EspDataInsert = graphql(`
    mutation insertEspData($payload: esp_data_insert_input!) {
        insert_esp_data_one(object: $payload) {
            data
        }
    }
`)

export async function insertEspData(payload: VariablesOf<typeof EspDataInsert>['payload']) {
    const { mutation } = await getTadaServerClient()

    const { data, error } = await mutation(EspDataInsert, { payload })

    if (error) throw error

    return data?.insert_esp_data_one?.data
}
