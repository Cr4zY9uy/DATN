import jwt from "jsonwebtoken"
import user_model from "../models/user_model.js"
import { filterXSS } from 'xss'
export const checkAuth = async (req, res, next) => {
    try {
        const accessToken = filterXSS(req.cookies.access_token);
        if (!accessToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        await jwt.verify(
            accessToken,
            accessTokenSecret,
            async (err, decoded) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        return res
                            .status(401)
                            .json({ message: err.message });

                    }
                    if (err.name === 'JsonWebTokenError') {
                        return res
                            .status(403)
                            .json({ message: err.message });
                    }
                }
                const user = await user_model.findOne({ username: decoded.username })
                if (!user) {
                    return res.status(404).json({ message: "Not found user" });
                }
                if (decoded.role < 0 || decoded.role > 4) {
                    return res.status(405).json({ message: "Not allowed to access" });
                }
                const { password, refreshToken, ...userWithoutPassword } = user._doc;
                req.user = userWithoutPassword;
                next();
            });

    } catch (err) {
        return res.status(501).json({ message: err.message });
    }
};


export const authRole = (roleAllowed) => {
    return (req, res, next) => {
        const { role } = req.user
        if (roleAllowed.includes(role)) next()
        else return res.status(401).json({ message: "You have no permission" })
    }
}