export interface EspData {
    mac: string
    password: string
    temperature: number
    humidity: number
    light_intensity: number
    led_brightness: number
    relay_state: boolean
}

export type IPersistedResponse = Pick<EspData, 'led_brightness' | 'relay_state'>
