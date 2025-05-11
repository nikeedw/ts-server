import { Request, Response } from 'express'
import { insertEspData } from '../graphql/mutations/insertEspData.mutation.js'
import { upsertEspDevice } from '../graphql/mutations/upsertEspDevice.mutation.js'

export interface EspData {
    mac: string
    password: string
    temperature: number
    humidity: number
    light_intensity: number
    led_brightness: number
    relay_state: boolean
}

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

        return res.status(200).json(esp_data)
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: e.message })
    }
}
