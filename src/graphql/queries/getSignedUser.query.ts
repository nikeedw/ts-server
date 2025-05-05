import { getTadaServerClient, graphql, VariablesOf } from '@tada-server'

const SignedUserQuery = graphql(`
    query getSignedUser($username: String!) {
        users_by_pk(username: $username) {
            username
            password
        }
    }
`)

export async function getSignedUser(username: VariablesOf<typeof SignedUserQuery>['username']) {
    const { query } = await getTadaServerClient()

    const { data, error } = await query(SignedUserQuery, { username })

    if (error) throw error

    return data?.users_by_pk
}
