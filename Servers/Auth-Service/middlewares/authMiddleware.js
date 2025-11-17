import { verifyAccessToken } from "../services/tokenService.js";

export const authMiddleware = (req,res,next) => {
    const token = req.headers['authorization'];
    if(!token) return res.status(403).json({message: 'Token Required'});
    try {
        const decoded = verifyAccessToken(token.split(' ')[1]);
        req.user = {
            userId: decoded.userId,
            role: decoded.role,
        };
        next();
    } catch (error) {
        res.status(403).json({message: 'Invalid or expired token',error: error.message});
    }
}