import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import {createTables} from "./src/config/queries.js"
import pool from "./src/config/db.js"
import errorHandler from "./src/middleware/errorHandler.js"
import MainRouter from "./src/routes/index.js"

dotenv.config()

const app=express()
const PORT=process.env.PORT || 4000


app.use(morgan('combined')) 
app.use(express.json())

app.post("/setUp",async (req,res,next)=>{
    try{
        const qiy=await pool.query(createTables.create)
        if(!qiy) return res.status(400).json({message:"Error with create"})
        res.send({message:"Tables created successfully"})
    }catch(err){
        next(err)
    }
})

app.use('/',MainRouter)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})