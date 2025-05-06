import { CheckUserExistsQuery } from '@src/graphql/queries/checkExistingUser.query'
import { RegisterUserMutation } from '@src/graphql/mutations/RegisterUserMutation.mutation'
import { Request, Response } from 'express'
import { getTadaServerClient } from '@tada-server'
import bcrypt from 'bcryptjs'
import { EnvConfigs } from '@src/EnvConfigs'

export async function register(req: Request, res: Response) {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({ message: 'Missing fields' })
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
