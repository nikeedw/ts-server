import express, { json } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

import { getRoutes } from './routes.js'
import { useCors } from './middlewares/useCors.js'
import { EnvConfigs } from './EnvConfigs.js'

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
