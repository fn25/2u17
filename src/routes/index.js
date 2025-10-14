import { Router } from "express";
import UserRouter from "./user.route.js";
import BoardRouter from "./board.route.js";
import taskRouter from "./task.route.js";

import { login, register } from "../controllers/auth.controller.js";

const MainRouter=Router()

MainRouter.use("/users",UserRouter)
MainRouter.use("/board",BoardRouter)
MainRouter.use("/task",taskRouter)
MainRouter.post("/register",register)
MainRouter.post("/login",login)

export default MainRouter





