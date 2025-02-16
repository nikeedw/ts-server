import { Express } from 'express'
import multer from 'multer'
import { eliminateFirebase } from '@src/handlers/eliminateFirebase'

const upload = multer()

export function getRoutes(app: Express) {
    /**
     * shared getter
     * // TODO need to split specific endpoint for this context
     */
    app.get('/eliminate', upload.none(), (req, res) => eliminateFirebase(req, res))
}
