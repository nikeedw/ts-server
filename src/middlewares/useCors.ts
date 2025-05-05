import { Request, Response, NextFunction } from 'express'

export function useCors(_request: Request, res: Response, next: NextFunction) {
    try {
        res.header('Access-Control-Allow-Credentials', 'true')

        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, esp-data')

        res.header('Access-Control-Allow-Origin', 'http://localhost:3000')

        // Handle pre-flight OPTIONS requests
        if (_request.method === 'OPTIONS') {
            return res.status(200).end()
        }

        return next()
    } catch (e) {
        return res.status(403).send({ message: 'Access restricted' })
    }
}
