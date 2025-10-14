import pool from "../config/db.js"
import { queryTask } from "../config/queries.js"
import { deleteId, getALL, getId } from "../helpers/utils.js"
import { taskValidation } from "../validation/validation.js"
import { ApiResponse } from "../helpers/responseHelper.js"

export const create=async(req,res,next)=>{
    try{
        const {value,error}=taskValidation(req.body)
        if(error) return res.status(422).json(
            ApiResponse.error("Validation error",422,error.details)
        )
        
        const {title,order,description,userId,boardId,columnId}=value
        const {rows}=await pool.query(queryTask.insert,[title,order||0,description,userId,boardId,columnId])
        
        res.status(201).json(
            ApiResponse.success(rows[0],"Task created",201)
        )
    }catch(err){
        next(err)
    }
}

export const getAll=async(req,res,next)=>{
    try{
        const {rows}=await pool.query("select * from tasks order by created_at desc")
        res.status(200).json(
            ApiResponse.success(rows,"All tasks successfully retrieved")
        )
    }catch(err){
        next(err)
    }
}

export const getById=async (req,res,next)=>{
    try{
        const {id}=req.params
        const {rows}=await pool.query("select * from tasks where id=$1",[id])
        if(rows.length==0){
            return res.status(404).json(ApiResponse.error("Task not found",404))
        }
        res.status(200).json(ApiResponse.success(rows[0],"Task found successfully"))
    }catch(err){
        next(err)
    }
}

export const updatetask=async(req,res,next)=>{
    try{
        const {id}=req.params
        const {value,error}=taskValidation(req.body)
        if(error) return res.status(422).json(ApiResponse.error("Error with input data",422,error.details))
        
        const {title,order,description,userId,boardId,columnId}=value
        const result=await pool.query(queryTask.upgrade,[title,order||0,description,userId,boardId,columnId,id])
        
        if(result.rows.length == 0){
            return res.status(404).json(ApiResponse.error("Task not found",404))}
        res.status(200).json(ApiResponse.success(result.rows[0],"Task updated successfully"))
    }catch(err){
        next(err)
    }
}
export const deletetask=async(req,res,next)=>{
    try{
      const {id}=req.params
      const result=await pool.query('delete from tasks where id=$1 returning *',[id])
      if(result.rows.length==0){
        return res.status(404).json(ApiResponse.error('Task not found',404))
      }
      res.status(200).json(ApiResponse.success(result.rows[0],"Task deleted successfully"))
    }catch(err){
        next(err)
    }
}