import express, { json } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
// import 'source-map-support/register'
// import { json } from 'body-parser'

import { EnvConfigs } from './EnvConfigs'
import { getRoutes } from './routes'
import { useCors } from './middlewares/useCors'

const app = express()

app.set('trust proxy', true)

app.use(cookieParser())

app.use(json({ limit: '10mb' }))

app.use(useCors)

app.use(helmet())

app.disable('etag').disable('x-powered-by')

const PORT = EnvConfigs.PORT

//auth server

getRoutes(app)

app.listen(PORT)

console.log('Server started. Listening on port: ', PORT)
