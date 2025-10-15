import { IdValidation } from "../validation/validation.js"
export const validateUUID = (name = 'id') => {
    return (req, res, next) => {
        const value = req.params[name]
        const { error } = IdValidation({ id: value })
        if (error) {
            return res.status(400).json({
                success: false,
                error: `Invalid ${name} format`
            })
        }
        next()
    }
}
export default validateUUID
