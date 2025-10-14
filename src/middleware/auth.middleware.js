
import jwt from 'jsonwebtoken'

const jwt_secret = process.env.JWT_SECRET || "my_secret"

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Access token required'
        })
    }

    jwt.verify(token, jwt_secret, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                error: 'Invalid token'
            })
        }
        req.user = user
        next()
    })
}


