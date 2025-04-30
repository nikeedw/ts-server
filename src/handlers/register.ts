import { CheckUserExistsQuery } from '@src/graphql/queries/checkExistingUser.query'
import { RegisterUserMutation } from '@src/graphql/mutations/RegisterUserMutation.mutation'
import { Request, Response } from 'express'
import { getTadaServerClient } from 'generated/tada/server-graphql'
import bcrypt from 'bcrypt'
import { EnvConfigs } from '@src/EnvConfigs'

export async function register(req: Request, res: Response) {
    try {
        const { username, password, confirmPassword } = req.body

        if (!username || !password || !confirmPassword) {
            return res.status(400).send('Missing fields')
        }

        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match')
        }

        const { query, mutation } = await getTadaServerClient()

        // Check if user already exists
        const { data: existingUserData, error: queryError } = await query(CheckUserExistsQuery, { username })

        if (queryError) {
            console.error(queryError)
            return res.status(500).send('Error checking user existence')
        }

        if (existingUserData?.users_by_pk) {
            return res.status(409).send('Username already exists')
        }

        const hashedPassword = await bcrypt.hash(password, EnvConfigs.TOKEN_SALT)

        // Proceed with user insertion
        const { data: insertData, error: insertError } = await mutation(RegisterUserMutation, {
            username,
            password: hashedPassword,
        })

        if (insertError) {
            console.error(insertError)
            return res.status(500).send('User registration failed')
        }

        return res.status(201).json({ username: insertData?.insert_users_one?.username })
    } catch (e) {
        console.error(e)
        return
    }
}
