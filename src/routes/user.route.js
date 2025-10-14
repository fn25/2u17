import { Router } from "express";
import { validateUUID } from "../middleware/validation.middleware.js"
import { createuser, deleteuser, getIduser, getUserAll, updateuser } from "../controllers/users.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

const UserRouter=Router()
UserRouter.use(authenticateToken)


UserRouter.post('/',createuser)
UserRouter.get('/',getUserAll)
UserRouter.get('/:id',validateUUID(),getIduser)
UserRouter.put('/:id',validateUUID(),updateuser)
UserRouter.delete('/:id',validateUUID(),deleteuser)

export default UserRouter
