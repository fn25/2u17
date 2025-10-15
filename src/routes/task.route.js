import { Router } from "express";
import { validateUUID } from "../middleware/validation.middleware.js"
import { create, deletetask, getAll, getById, updatetask } from "../controllers/tasks.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";


const taskRouter = Router()

taskRouter.use(authenticateToken)
taskRouter.post('/', create)
taskRouter.get('/', getAll)
taskRouter.get('/:id', validateUUID(), getById)
taskRouter.put('/:id', validateUUID(), updatetask)
taskRouter.delete("/:id", validateUUID(), deletetask)

export default taskRouter




