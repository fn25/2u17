export class ApiResponse {
    static success(data, message = 'Success', statusCode = 200) {
        return {success: true,statusCode,message,data
        }
    }

    static error(message = 'Error', statusCode = 500, errors = null) {
        return {
            success: false,statusCode,message,errors
        }
    }
    static paginated(data, pagination, message = 'Success') {
        return {
            success: true,message,data,pagination}
    }
}

export class Helper {
    static async tranzak(pool, callback) {
        const client = await pool.connect()
        try {
            await client.query('BEGIN')
            const result = await callback(client)
            await client.query('COMMIT')
            return result
        } catch (error) {
            await client.query('ROLLBACK')
            throw error
        } finally {
            client.release()
        }
    }

    static pagquery(name, page = 1, limit = 10) {
        const offset = (page - 1) * limit
        return `select * from ${name} LIMIT ${limit} OFFSET ${offset}`
    }
}

export const asyncHandler = (data) => (req, res, next) => {
    Promise.resolve(data(req, res, next)).catch(next)
}
