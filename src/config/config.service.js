import dotenv from "dotenv"
import path from "path"
dotenv.config({ path: path.resolve(`./.env.${process.env.NODE_ENV}`) })

const port = process.env.PORT
const uri = process.env.DB_URI

export const env = {
    port, uri
}
