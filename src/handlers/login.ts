import { EnvConfigs } from '@src/EnvConfigs'
import { getSignedUser } from '@src/graphql/queries/getSignedUser.query'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export async function login(req: Request, res: Response) {
    try {
        console.log('testare')

        const { username, password } = req.body

        if (!username || !password) {
            return res.status(403).send('The username or password are missing')
        }

        const registeredUser = await getSignedUser(username)

        if (!registeredUser) {
            return res.status(403).send('The user is not registered')
        }

        const isPasswordEqual = await bcrypt.compare(password, registeredUser.password)

        if (!isPasswordEqual) return res.status(401).json({ message: 'The username or password are wrong' })

        const token = jwt.sign({ username: registeredUser.username }, EnvConfigs.JWT_SECRET)

        return res.status(200).json({ token })
    } catch (e) {
        console.error(e)
        return
    }
}
