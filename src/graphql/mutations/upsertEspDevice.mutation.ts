import { getTadaServerClient, graphql, VariablesOf } from '../../generated/tada/server-graphql.js'

const EspDeviceUpsert = graphql(`
    mutation upsertEspDevice($object: espmac_insert_input!) {
        insert_espmac_one(object: $object, on_conflict: { constraint: espmac_pkey, update_columns: mac_addr }) {
            mac_addr
        }
    }
`)

export async function upsertEspDevice(object: VariablesOf<typeof EspDeviceUpsert>['object']) {
    const { mutation } = await getTadaServerClient()

    const { data, error } = await mutation(EspDeviceUpsert, { object })

    if (error) throw error

    return data?.insert_espmac_one?.mac_addr
}
