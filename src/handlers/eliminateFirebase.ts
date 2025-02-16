import { fetchDataFromRealtimeDatabase } from '@src/configs/firebase.config'
import { Request, Response } from 'express'

// TODO: remove this endpoint (build just for testing purposes)
export async function eliminateFirebase(_req: Request, res: Response) {
    await fetchDataFromRealtimeDatabase()

    res.send('response')
}
