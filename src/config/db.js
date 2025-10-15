import { Pool } from "pg";
import dotenv from "dotenv"

dotenv.config()

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
})
pool.on("connect", () => {
    console.log("Database connected successfully")
})

pool.on("error", (err) => {
    console.error("Database connection error:", err.message)
})
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring client:', err.stack)
        return
    }
    console.log('Database connection pool created')
    release()
})
export default pool