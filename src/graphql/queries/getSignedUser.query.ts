import { getTadaServerClient, graphql, ResultOf, VariablesOf } from 'generated/tada/server-graphql'

const SignedUserQuery = graphql(`
    query getSignedUser($username: String!) {
        users_by_pk(username: $username) {
            username
            password
        }
    }
`)

export async function getSignedUser(
    username: VariablesOf<typeof SignedUserQuery>['username'],
) {
    try {
        const { query } = await getTadaServerClient()

        const { data, error } = await query(SignedUserQuery, { username })

        if (error) throw error

        return data?.users_by_pk
    } catch (e) {
        console.error(e)
        return
    }
}
