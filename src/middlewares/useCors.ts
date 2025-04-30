import { Request, Response, NextFunction } from 'express'

export function useCors(_request: Request, res: Response, next: NextFunction) {
    try {
        // Allow credentials (cookies, authorization headers, etc.)
        res.header('Access-Control-Allow-Credentials', 'true')

        // Allow specific methods (GET, POST, PUT, DELETE, etc.)
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

        // Allow specific headers (you can add more if needed)
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, esp-data')

        // Allow specific origins (adjust as needed for your frontend origin)
        res.header('Access-Control-Allow-Origin', 'http://localhost:5173') // Replace with your frontend URL

        // Handle pre-flight OPTIONS requests
        if (_request.method === 'OPTIONS') {
            return res.status(200).end()
        }

        return next()
    } catch (e) {
        return res.status(403).send({ message: 'Access restricted' })
    }
}
