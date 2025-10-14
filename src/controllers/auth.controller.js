import pool from "../config/db.js"
import {userquery} from "../config/queries.js"
import { userValidation } from "../validation/validation.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {ApiResponse} from "../helpers/responseHelper.js"

const jwt_secret=process.env.JWT_SECRET || "my_secret"
export const register=async (req,res,next)=>{
    try{
        const {value,error}=userValidation(req.body)
        if(error) return res.status(422).json(ApiResponse.error("Validation error",422,error.details))
        const {name,email,password}=value
        const existUser=await pool.query(
            "Select id from users where email=$1",[email])
        if(existUser.rows.length>0) return res.status(400).json(ApiResponse.error("User mavjud",400))
        const salt=10
        const hashedPassword=await bcrypt.hash(password,salt)
        const {rows}=await pool.query(userquery.insert,[name,email,hashedPassword])
        const user=rows[0]
        delete user.password
        const token=jwt.sign({userId:user.id,email:user.email},jwt_secret,{expiresIn:'48h'})
        res.status(201).json(ApiResponse.success({user,token},"Successfully registred",201))
    }catch(err){
        next(err)
    }
}
export const login=async (req,res,next)=>{
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json(ApiResponse.error("Email and password required",400))
        }
        const {rows}=await pool.query('select * from users where email=$1',[email])
        if(rows.length===0){
            return res.status(401).json(ApiResponse.error("Username or password is invalid",401))
        }
        const user=rows[0]
        const isValidPassword=await bcrypt.compare(password,user.password)
        if(!isValidPassword){
            return res.status(401).json(ApiResponse.error("INvalid email or password",401))
        }
        delete user.password
        const token=jwt.sign({userId:user.id,email:user.email},jwt_secret,{expiresIn:"24h"})
        res.status(200).json(ApiResponse.success({user,token},"Login succesful",200))
    }catch(err){
        next(err)
    }
}




