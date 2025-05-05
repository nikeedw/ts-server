import { graphql } from '@tada-server'

export const RegisterUserMutation = graphql(`
    mutation RegisterUser($username: String!, $password: String!) {
        insert_users_one(object: { username: $username, password: $password }) {
            username
        }
    }
`)
