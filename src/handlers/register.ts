import { CheckUserExistsQuery } from '../graphql/queries/checkExistingUser.query.js'
import { RegisterUserMutation } from '../graphql/mutations/RegisterUserMutation.mutation.js'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { EnvConfigs } from '../EnvConfigs.js'
import { getTadaServerClient } from '../generated/tada/server-graphql.js'

export async function register(req: Request, res: Response) {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({ message: 'The username or password are missing' })
        }

        const { query, mutation } = await getTadaServerClient()

        // Check if user already exists
        const { data: existingUserData, error: queryError } = await query(CheckUserExistsQuery, { username })

        if (queryError) throw queryError

        if (existingUserData?.users_by_pk) {
            return res.status(409).json({ message: 'Username already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, EnvConfigs.TOKEN_SALT)

        // Proceed with user insertion
        const { data: insertData, error: insertError } = await mutation(RegisterUserMutation, {
            username,
            password: hashedPassword,
        })

        if (insertError) throw insertError

        return res.status(201).json({ username: insertData?.insert_users_one?.username })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: e.message })
    }
}
