import express from 'express'
import { env } from './config/config.service.js'
const app = express()




app.listen(env.port, () => console.log(`Example app listening on port ${env.port}!`))