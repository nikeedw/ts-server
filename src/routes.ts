import { updateEspState } from './handlers/updateEspState.js'
import { syncEspDataWithDB } from './handlers/esp.js'
import { login } from './handlers/login.js'
import { register } from './handlers/register.js'
import { Express } from 'express'
import multer from 'multer'

const upload = multer()

export function getRoutes(app: Express) {
    app.post('/login', upload.none(), login)
    app.post('/register', upload.none(), register)
    app.post('/esp', upload.none(), syncEspDataWithDB)

    app.get('/esp', upload.none(), updateEspState)
}

/** @backup REMOVE after release */
// GET: ESP requests current led/relay state
// app.get('/esp', (req: Request, res: Response) => {
//     const mac = req.query.mac as string

//     if (!mac) {
//         console.error('Missing MAC address in query')
//         return res.status(400).json({ error: 'MAC address is required' })
//     }

//     console.log(`ESP requested state for MAC: ${mac}`)

//     let state = deviceStates.get(mac)

//     if (!state) {
//         console.log('No state found for this MAC, creating default')
//         state = { led_brightness: 512, relay_state: true }
//         deviceStates.set(mac, state)
//     }

//     return res.json(state)
// })
