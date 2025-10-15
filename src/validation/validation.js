import Joi from "joi"
function userValidation(data) {
    const userSchema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(30).required()
    })
    return userSchema.validate(data, { abortEarly: false })
}
export function userupdate(data) {
    const userSchema = Joi.object({
        name: Joi.string().min(2).max(50).optional(),
        email: Joi.string().email().optional(),
        password: Joi.string().min(8).max(30).optional()
    }).min(1)
    return userSchema.validate(data, { abortEarly: false })
}
function taskValidation(data) {
    const taskSchema = Joi.object({
        title: Joi.string().min(2).max(100).required(),
        order: Joi.number().integer().min(0).default(0),
        description: Joi.string().min(5).max(1000).allow(null, ''),
        userId: Joi.string().uuid().required(),
        boardId: Joi.string().uuid().required(),
        columnId: Joi.string().min(1).max(60).required()
    })
    return taskSchema.validate(data, { abortEarly: false })
}
function boardValidation(data) {
    const boardSchema = Joi.object({
        title: Joi.string().min(2).max(100).required(),
        columns: Joi.string().min(1).required()
    })
    return boardSchema.validate(data, { abortEarly: false })
}
export function boardupdate(data) {
    const boardSchema = Joi.object({
        title: Joi.string().min(2).max(100).optional(),
        columns: Joi.string().min(1).optional()
    }).min(1)
    return boardSchema.validate(data, { abortEarly: false })
}
function IdValidation(data) {
    const IdV = Joi.object({
        id: Joi.string().uuid().required()
    })
    return IdV.validate(data, { abortEarly: false })
}
export function taskupdate(data) {
    const taskSchema = Joi.object({
        title: Joi.string().min(2).max(100).optional(),
        order: Joi.number().integer().min(0).optional(),
        description: Joi.string().min(5).max(1000).optional(),
        userId: Joi.string().uuid().optional(),
        boardId: Joi.string().uuid().optional(),
        columnId: Joi.string().min(1).max(60).optional()
    }).min(1)
    return taskSchema.validate(data, { abortEarly: false })
}
export { IdValidation, boardValidation, taskValidation, userValidation }
