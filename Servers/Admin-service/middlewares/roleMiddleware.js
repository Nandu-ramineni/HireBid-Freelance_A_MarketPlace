export const roleMiddleware = (role) => (req, res, next) => {
    if (req.admin.role !== role) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
}