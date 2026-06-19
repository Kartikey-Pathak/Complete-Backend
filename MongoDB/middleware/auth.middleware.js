import jwt from "jsonwebtoken";

export const authMiddleware = (req, resp, next) => {
    try {
        const tokenheader = req.header('authorization');
        if (!tokenheader) {
            return next();
        }
        console.log(tokenheader)
        if (!tokenheader.startsWith('Bearer')) {
            return resp.status(400).json({ error: "Authorization token must start with Bearer.." });
        }
        const token = tokenheader.split(' ')[1];


        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        return next();
    } catch (error) {
        return resp.status(401).json({
            error: error.message
        });
    }
}

export const ensureAuthenticated = (req, resp, next) => {
    if (!req.user) {
        return resp.status(401).json({ error: "You Must be authenticated sir..." });
    }

    return next();
}