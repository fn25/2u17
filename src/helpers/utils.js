import pool from "../config/db.js"

export const getId = async (res, name, id) => {
    try {
        const query = `SELECT * FROM ${name} WHERE id=$1`
        const result = await pool.query(query, [id])

        return result.rows
    } catch (err) {
        throw new Error(err)
    }
}

export const deleteId = async (res, name, id) => {
    try {
        const q = `DELETE FROM ${name} WHERE id=$1 RETURNING *`
        const result = await pool.query(q, [id])

        return result.rows
    } catch (err) {
        throw new Error(err)
    }
}

export const getALL = async (res, name) => {
    try {
        const q = `SELECT * FROM ${name} ORDER BY created_at DESC;`
        const result = await pool.query(q)
        res.status(200).json({
            success: true,
            data: result.rows
        })
    } catch (err) {
        throw new Error(err)
    }
}
