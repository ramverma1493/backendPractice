import jwt from 'jsonwebtoken'
import { SecretKey } from '../../config.mjs'

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    jwt.verify(token, SecretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token.' });
        }
        req.user = user;
        next();
    });
}

const authorizeToken = (req, res, next) => {
    let user = req.user
    let id = req.params.id
    if(user.userId !== id){
        return res.status(403).json({ error: 'Access forbidden. You are not the owner of this resource.' });
    }
    next();
}

export { authenticateToken, authorizeToken }