import { Request, Response } from 'express'
import { insertEspData } from '../graphql/mutations/insertEspData.mutation.js'
import { upsertEspDevice } from '../graphql/mutations/upsertEspDevice.mutation.js'
import { EspData } from '../interfaces/esp_data.interface.js'
import { DEVICES_STATE } from '../internal_storage/storage.js'

export async function syncEspDataWithDB(req: Request, res: Response) {
    try {
        const data = req.body as EspData

        const { mac, password, ...rest } = data

        const upserted_device = await upsertEspDevice({ mac_addr: mac, password })

        if (!upserted_device) throw new Error('Failed to upsert the device')

        const esp_data = await insertEspData({
            mac_addr: upserted_device,
            data: rest,
        })

        if (!esp_data) throw new Error('Failed to insert data for the device')

        /**@info example of expected response for ESP */
        // {
        //     "led_brightness": 512,
        //     "relay_state": true
        // }

        const typed_data = esp_data as EspData

        const persistedRes = {
            led_brightness: typed_data.led_brightness,
            relay_state: typed_data.relay_state,
        }

        DEVICES_STATE.set(mac, persistedRes)

        return res.status(200).json(persistedRes)
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: e.message })
    }
}
