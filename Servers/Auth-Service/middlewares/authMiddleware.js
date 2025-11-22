import User from "../models/User.js";
import { verifyAccessToken } from "../services/tokenService.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Token required" });

    try {
        const decoded = verifyAccessToken(token.split(" ")[1]);

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        // 🔥 Check tokenVersion
        if (user.tokenVersion !== decoded.tokenVersion) {
            return res.status(401).json({
                message: "Session invalidated. Please login again."
            });
        }

        req.user = {
            userId: decoded.userId,
            role: decoded.role,
        };

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token", error: error.message });
    }
};


// import { verifyAccessToken } from "../services/tokenService.js";

// export const authMiddleware = (req,res,next) => {
//     const token = req.headers['authorization'];
//     if(!token) return res.status(403).json({message: 'Token Required'});
//     try {
//         const decoded = verifyAccessToken(token.split(' ')[1]);
//         req.user = {
//             userId: decoded.userId,
//             role: decoded.role,
//         };
//         next();
//     } catch (error) {
//         res.status(403).json({message: 'Invalid or expired token',error: error.message});
//     }
// }