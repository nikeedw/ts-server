import { Request, Response } from 'express'
import { DEVICES_STATE } from '../internal_storage/storage.js'

export async function updateEspState(req: Request, res: Response) {
    try {
        const { mac } = req.query

        // MAC address is always required
        if (typeof mac !== 'string') {
            return res.status(400).json({ message: 'MAC address is required' })
        }

        // Handle two types of requests:
        // 1. ESP request with just MAC - return current state
        // 2. Frontend request with all parameters - update state
        const { led_brightness, relay_state } = req.query

        // Case 1: ESP making a request with just the MAC address
        if (!led_brightness || !relay_state) {
            // Return current state for this device if it exists
            const internal_state = DEVICES_STATE.get(mac)

            if (internal_state) {
                return res.status(200).json(internal_state)
            }

            // If no state exists yet, return defaults
            return res.status(200).json({
                led_brightness: 512,
                relay_state: false,
            })
        }

        // Case 2: Frontend request updating the state
        if (typeof led_brightness !== 'string') {
            return res.status(400).json({ message: 'Parameter led_brightness is required' })
        }

        if (typeof relay_state !== 'string' || !['true', 'false'].includes(relay_state)) {
            return res.status(400).json({
                message: 'Parameter relay_state is required and should be instance of true or false',
            })
        }

        // Convert types to match the expected response format
        const brightnessValue = parseInt(led_brightness)
        const relayValue = relay_state === 'true'

        // Update the stored state for this device
        DEVICES_STATE.set(mac, {
            led_brightness: brightnessValue,
            relay_state: relayValue,
        })

        // Return the updated state
        return res.status(200).json({
            led_brightness: brightnessValue,
            relay_state: relayValue,
        })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: e.message })
    }
}
