import { Express } from 'express'
import multer from 'multer'

const upload = multer()

export function getRoutes(_app: Express) {
    /**
     * shared getter
     * // TODO need to split specific endpoint for this context
     */
}
