import { Request, Response } from 'express'

// In-memory store to track the current state of each device
// In a production app, you'd use a database instead
const deviceStates: Record<string, { led_brightness: number; relay_state: boolean }> = {}

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
        if (led_brightness === undefined || relay_state === undefined) {
            // Return current state for this device if it exists
            if (deviceStates[mac]) {
                return res.status(200).json({
                    led_brightness: deviceStates[mac].led_brightness,
                    relay_state: deviceStates[mac].relay_state,
                })
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
        deviceStates[mac] = {
            led_brightness: brightnessValue,
            relay_state: relayValue,
        }

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
