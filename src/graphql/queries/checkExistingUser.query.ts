import { graphql } from '../../generated/tada/server-graphql.js'

export const CheckUserExistsQuery = graphql(`
    query CheckUserExists($username: String!) {
        users_by_pk(username: $username) {
            username
        }
    }
`)
