import { Request, Response } from 'express'

export async function updateEspState(req: Request, res: Response) {
    try {
        const mac = req.query.mac as string
        if (!mac) return res.status(400).json({ message: 'MAC address is required' })

        return res.status(200).json({
            led_brightness: 512,
            relay_state: true,
        })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: e.message })
    }
}
