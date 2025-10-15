
import jwt from 'jsonwebtoken'

const jwt_secret = process.env.JWT_SECRET || "my_secret"

export const authenticateToken = (req, res, next) => {
    //Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

    const authHeader = req.headers['authorization']
    let token
    if (authHeader) {
        token = authHeader.split(' ')[1]
    } else {
        token = undefined
    }


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


