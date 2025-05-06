import { EnvConfigs } from '../EnvConfigs.js'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function useJwtCheck(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]

    try {
        // TODO: Need to verify if subdomain from token is the same as the one from the request
        if (!EnvConfigs.JWT_SECRET || !token || !jwt.verify(token, EnvConfigs.JWT_SECRET)) {
            throw new Error('Not authorized')
        }

        next()
    } catch (e) {
        res.status(401).send(e.message)
    }
}
