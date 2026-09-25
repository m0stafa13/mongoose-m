import express from 'express'
import { env } from './config/config.service.js'
import userRouter from './module/user/user.controller.js'
import postRouter from './module/posts/post.controller.js'
import { dbConnection } from './db/connection.js'
const app = express()
app.use(express.json())
// database connection 
dbConnection()
//use to user router 
app.use("/auth", userRouter)
// use to posts router
app.use("/posts", postRouter)

app.listen(env.port, () => console.log(`Example app listening on port ${env.port}!`))