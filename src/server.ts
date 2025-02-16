import express, { json } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

import { EnvConfigs } from './EnvConfigs'
import { useCors } from '@src/middlewares/useCors'
import { getRoutes } from '@src/routes'
// import { initializeFirebaseApp } from '@src/configs/firebase.config'

const app = express()

// initializeFirebaseApp()

app.set('trust proxy', true)

app.use(cookieParser())

app.use(json({ limit: '10mb' }))

app.use(useCors)

app.use(helmet())

app.disable('etag').disable('x-powered-by')

/* ts server */
const PORT = EnvConfigs.PORT

getRoutes(app)

app.listen(PORT)

console.log('Started server! listening on port: ', PORT)
