import { graphql } from '@tada-server'

export const CheckUserExistsQuery = graphql(`
    query CheckUserExists($username: String!) {
        users_by_pk(username: $username) {
            username
        }
    }
`)
