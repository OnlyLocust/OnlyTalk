import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const auth = (req , res , next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'You are not authorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECREAT_KEY);
        req.username = decoded; // Attach user data to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ error: 'Token is invalid or expired' });
    }

}

export default auth