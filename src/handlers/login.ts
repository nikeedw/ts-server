import { EnvConfigs } from '../EnvConfigs.js'
import { getSignedUser } from '../graphql/queries/getSignedUser.query.js'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export async function login(req: Request, res: Response) {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(403).json({ message: 'The username or password are missing' })
        }

        const registeredUser = await getSignedUser(username)

        if (!registeredUser) {
            return res.status(403).json({ message: 'The user is not registered' })
        }

        const isPasswordEqual = await bcrypt.compare(password, registeredUser.password)

        if (!isPasswordEqual) return res.status(401).json({ message: 'The username or password are wrong' })

        const token = jwt.sign(
            // { username: registeredUser.username, default_roles: ['admin'], role: 'admin' },
            { username: registeredUser.username },
            EnvConfigs.JWT_SECRET,
        )

        return res.status(200).json({ token })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: e.message })
    }
}
