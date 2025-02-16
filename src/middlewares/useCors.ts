import { Request, Response, NextFunction } from 'express'

export function useCors(_request: Request, res: Response, next: NextFunction) {
    try {
        res.header('Access-Control-Allow-Credentials', 'true')

        res.header('Access-Control-Allow-Methods', 'GET, OPTIONS' /* ', POST, OPTIONS, PUT, DELETE' */)

        res.header('Access-Control-Allow-Headers', 'esp-data')

        return next()
    } catch (e) {
        return res.status(403).send({ message: 'Access restricted' })
    }
}
