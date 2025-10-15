import pool from "../config/db.js"
import { boardQueries } from "../config/queries.js"
import { boardupdate, boardValidation } from "../validation/validation.js"
import { ApiResponse } from "../helpers/responseHelper.js"
export const getALlBoards = async (req, res, next) => {
    try {
        const result = await pool.query(boardQueries.getAll)
        res.status(200).json(ApiResponse.success(result.rows, "Boards retrived successfully"))
    } catch (err) {
        next(err)
    }
}
export const getBoardId = async (req, res, next) => {
    try {
        const { id } = req.params
        const res1 = await pool.query(boardQueries.getID, [id])
        if (res1.rows.length === 0) {
            return res.status(404).json(ApiResponse.error("Board not found", 404))
        }
        res.status(200).json(ApiResponse.success(res1.rows[0], "Board found successfully"))
    } catch (err) {
        next(err)
    }
}
export const createBoard = async (req, res, next) => {
    try {
        const { value, error } = boardValidation(req.body)
        if (error) return res.status(422).json(ApiResponse.error("Validation error", 422, error.details))
        const { title, columns } = value
        const { rows } = await pool.query(boardQueries.insert, [title, columns])
        return res.status(201).json(ApiResponse.success(rows[0], "Board created successfully", 201))
    } catch (err) {
        next(err)
    }
}
export const updateBoard = async (req, res, next) => {
    try {
        const { id } = req.params
        const { value, error } = boardupdate(req.body)
        if (error) return res.status(422).json(ApiResponse.error("Validation error", 422, error.details))
        const old = await pool.query("select * from boards where id=$1", [id])
        if (old.rows.length == 0) return res.status(422).json(ApiResponse.error("NOt found", 422, error.details))
        const olduser = old.rows[0]
        const newuser = {
            title: value.title ?? olduser.title,
            columns: value.columns ?? olduser.columns
        }
        const { rows } = await pool.query(boardQueries.update, [newuser.title, newuser.columns,id])
        const board = rows[0]
        return res.status(200).json(ApiResponse.success(board, "board updated successfully"))
    } catch (err) {
        next(err)
    }
}
export const deleteboard = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await pool.query(boardQueries.deleteboard, [id])
        if (result.rows.length === 0) {
            return res.status(404).json(ApiResponse.error("Board not found", 404))
        }
        return res.status(200).json(ApiResponse.success(result.rows[0], "Board deleted successfully"))
    } catch (err) {
        next(err)
    }
}









