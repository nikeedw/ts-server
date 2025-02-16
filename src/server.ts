import express, { json } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

import { EnvConfigs } from './EnvConfigs'
import { useCors } from '@src/middlewares/useCors'

const app = express()

app.set('trust proxy', true)

app.use(cookieParser())

app.use(json({ limit: '10mb' }))

app.use(useCors)

app.use(helmet())

app.disable('etag').disable('x-powered-by')

const PORT = EnvConfigs.PORT

//auth server

app.listen(PORT)

console.log('Started server! listening on port: ', PORT)
