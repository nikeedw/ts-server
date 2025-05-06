import { login } from './handlers/login.js'
import { register } from './handlers/register.js'
import { Express } from 'express'

import multer from 'multer'

const upload = multer()

export function getRoutes(app: Express) {
    app.post('/login', upload.none(), login)
    app.post('/register', upload.none(), register)
}
