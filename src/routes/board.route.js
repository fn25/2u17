import express from "express"
import { validateUUID } from "../middleware/validation.middleware.js"
import { getALlBoards, getBoardId, createBoard, updateBoard, deleteboard } from "../controllers/boards.controller.js"
import { authenticateToken } from "../middleware/auth.middleware.js"

const BoardRouter=express.Router()

BoardRouter.use(authenticateToken)
BoardRouter.get('/',getALlBoards)
BoardRouter.get('/:id',validateUUID(),getBoardId)
BoardRouter.post('/',createBoard)
BoardRouter.put('/:id',validateUUID(),updateBoard)
BoardRouter.delete('/:id',validateUUID(),deleteboard)

export default BoardRouter


