import { login } from '@src/handlers/login'
import { register } from '@src/handlers/register'
import { Express } from 'express'
import multer from 'multer'

const upload = multer()

export function getRoutes(app: Express) {
    /**
     * shared getter
     * // TODO need to split specific endpoint for this context
     */
    app.get('/login', upload.none(),  login)
    app.get('/register', upload.none(),  register)
}
