import pool from "../config/db.js"
import { userquery } from "../config/queries.js"
import { deleteId, getALL, getId } from "../helpers/utils.js"
import { userupdate, userValidation } from "../validation/validation.js"
import { ApiResponse, asyncHandler, Helper } from "../helpers/responseHelper.js"
import * as bcrypt from "bcrypt"

const createuser = async (req, res, next) => {
    try {
        const { value, error } = userValidation(req.body)
        if (error) return res.status(400).json(ApiResponse.error(
            "data isn't approprite", 400, error.details)
        )
        const { name, email, password } = value
        const salt = 10
        const hashedPassword = await bcrypt.hash(password, salt)
        const { rows } = await pool.query(userquery.insert, [name, email, hashedPassword])

        const user = rows[0]
        delete user.password

        return res.status(201).json(ApiResponse.success(user, "User created", 201))
    } catch (err) {
        next(err)
    }
}
const getIduser = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await getId(res, 'users', id)
        if (result.length == 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        let { page = 1, limit = 10 } = req.query
        page = parseInt(page)
        limit = parseInt(limit)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const natija = result.slice(startIndex, endIndex)
        const filteredUsers = natija.map(({ password, ...user }) => user)
        res.status(200).json({
            success: true,
            data: filteredUsers
        })
    } catch (err) {
        next(err)
    }
}

const deleteuser = asyncHandler(async (req, res) => {

    const { id } = req.params
    const result = await Helper.tranzak(pool, async (c) => {
        const deleted = deleteId(res, "users", id)
        return deleted
    })
    if (!result || result.length == 0) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }
    const user=result[0]
    delete user.password

    return res.status(200).json({
        success: true,
        message: "User successfully deleted",
        data: user
    })

})

const getUserAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const { rows: countRows } = await pool.query("select count(*) from users")
        const totalCount = parseInt(countRows[0].count)
        if (totalCount == 0) {
            return res.status(404).json(ApiResponse.error("Users not found", 404))
        }
        const q = Helper.pagquery('users', page, limit)
        const { rows: users } = await pool.query(q)
       const filteredUsers = users.map(({ password, ...user }) => user)
        return res.status(200).json(ApiResponse.paginated(
            filteredUsers, {
            total: totalCount, page, limit,
            totalPages: Math.ceil(totalCount / limit)
        },
            "Users retrieved successfully"))
    } catch (err) {
        next(err)
    }
}
const updateuser = async (req, res, next) => {
    try {
        const { id } = req.params
        const { value, error } = userupdate(req.body)
        if (error) return res.status(422).json(ApiResponse.error("Validation error", 422, error.details))

        const old = await pool.query("select * from users where id=$1", [id])
        if (old.rows.length == 0) return res.status(422).json(ApiResponse.error("NOt found", 422, error.details))
        const olduser = old.rows[0]
        const newuser = {
            name: value.name ?? olduser.name,
            email: value.email ?? olduser.email,
            password: value.password ? await bcrypt.hash(value.password, 10) : olduser.password
        }
        const { rows } = await pool.query(userquery.update, [newuser.name, newuser.email, newuser.password, id])
        const user = rows[0]
        delete user.password
        return res.status(200).json(ApiResponse.success(user, "User updated successfully"))
    } catch (err) {
        console.error(err)
        next(err)
    }
}
export { createuser, getUserAll, getIduser, updateuser, deleteuser }


