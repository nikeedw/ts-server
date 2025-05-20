// In-memory store to track the current state of each device

import { IPersistedResponse } from '../interfaces/esp_data.interface.js'

// In a production app, you'd use a database instead
export const DEVICES_STATE: Map<string, IPersistedResponse> = new Map()
