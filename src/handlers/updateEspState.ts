import { Request, Response } from 'express'

export async function updateEspState(req: Request, res: Response) {
    try {
        const { mac, led_brightness, relay_state } = req.query

        if (typeof mac !== 'string') {
            return res.status(400).json({ message: 'MAC address is required' })
        }

        if (typeof led_brightness !== 'string') {
            return res.status(400).json({ message: 'Parameter led_brightness is required' })
        }

        if (typeof relay_state !== 'string' || !['true', 'false'].includes(relay_state)) {
            return res.status(400).json({
                message: 'Parameter relay_state is required and should be instance of true or false',
            })
        }

        return res.status(200).json({
            led_brightness,
            relay_state: relay_state === 'true',
        })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: e.message })
    }
}
