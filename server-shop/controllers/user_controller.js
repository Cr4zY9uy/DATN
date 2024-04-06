import bcrypt from "bcryptjs"
import user_model from "../models/user_model.js";
import jwt, { decode } from "jsonwebtoken"
import randToken from "rand-token"
import { filterXSS } from 'xss'
export const loginByGoogle = async (req, res) => {
    res.json({ message: "Logged" })
}

export const login = async (req, res) => {
    console.log(req.body.username);
    try {
        const data = req.body;
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
        const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;

        const user = await user_model.findOne({ username: data.username });
        if (!user) {
            return res.status(404).json({ message: "Username not existed" });
        }

        const verify = await bcrypt.compare(data.password, user.password);
        if (!verify) {
            return res.status(404).json({ message: "Password not true" });
        }
        if (user.role !== 1) {
            return res.status(403).json({ message: "Not allowed" });
        }
        const dataForAccessToken = {
            username: user.username,
            role: user.role
        };

        const accessToken = jwt.sign(dataForAccessToken, accessTokenSecret, { expiresIn: accessTokenLife });
        if (!accessToken) {
            return res
                .status(503)
                .json({ message: 'Login fail, retry' });
        }
        const refreshToken = randToken.generate(12);
        if (!refreshToken) {
            return res
                .status(503)
                .json({ message: 'Login fail, retry' });
        }

        const dataForRefreshToken = {
            username: user.username,
            refresh_token: refreshToken
        };
        let refreshTokenSend = jwt.sign(dataForRefreshToken, refreshTokenSecret, { expiresIn: refreshTokenLife });
        if (!user.refreshToken) {
            await user_model.findOneAndUpdate({ username: user.username }, { refreshToken: refreshTokenSend })
        }
        else {
            refreshTokenSend = user.refreshToken;
        }
        res.cookie("refresh_token", refreshTokenSend, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 60 * 60 * 1000 * 24 });
        res.cookie("access_token", accessToken, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 60 * 60 * 1000 * 24 });
        return res.status(200).json({
            user: {
                username: user.username,
                name: user.name
            }
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const register = async (req, res) => {

    try {
        const data = req.body;
        const checkUsername = await user_model.findOne({ username: data.username });
        if (checkUsername) {
            return res.status(400).json({ message: "Username existed" });
        }
        const checkname = await user_model.findOne({ name: data.name });
        if (checkname) {
            return res.status(400).json({ message: "Name existed" });
        }
        const salt = await bcrypt.genSalt(12);
        const hashed = await bcrypt.hash(data.password, salt)
        data.password = hashed;
        const user = await user_model.create(data);
        if (user) {
            return res.status(201).json({ message: "Register successfully" });
        }
        else {
            return res.status(400).json({ message: error.message });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("refresh_token")
        res.clearCookie("access_token")
        return res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const refresh_access_token = async (req, res) => {
    try {

        const accessToken = req.cookies.access_token;
        const refreshToken = req.cookies.refresh_token;

        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        const refresfTokenSecret = process.env.REFRESH_TOKEN_SECRET;

        if (!accessToken) {
            return res.status(401).json({ message: "Access token not available" });
        }
        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token not available" });
        }

        const decoded = await jwt.verify(accessToken, accessTokenSecret, { ignoreExpiration: true });

        if (!decoded) {
            return res.status(404).json({ message: "Not available" });
        }
        const username = decoded.username;
        const role = decoded.role;
        const user = await user_model.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "User not exist" });
        }
        if (user.role !== 1 || role !== user.role) {
            return res.status(403).json({ message: "Not allowed" });
        }
        if (refreshToken !== user.refreshToken) {
            return res.status(403).json({ message: "Not allowed" });
        }
        // try {
        //     const checkRT = await jwt.verify(refreshToken, refresfTokenSecret);
        //     if (checkRT.username !== user.username) {
        //         return res.status(403).json({ message: "Not allowed" });
        //     }
        // } catch (error) {
        //     return res.status(401).json({ message: error.message });
        // }
        const dataForAccessToken = {
            username,
            role
        };
        const accessTokenNew = jwt.sign(dataForAccessToken, accessTokenSecret, { expiresIn: accessTokenLife });
        if (!accessTokenNew) {
            return res
                .status(500).json({ message: "System error" });
        }
        res.cookie("access_token", accessTokenNew, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 60 * 60 * 1000 * 24 });
        return res.status(201).json({ message: "Refresh access token successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

export const refresh_token = async (req, res) => {
    try {
        const data = req.body;

        const refreshToken = req.cookies.refresh_token;
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
        const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;

        const user = await user_model.findOne({ username: data.username });
        if (!user) {
            return res.status(404).json({ message: "Username not existed" });
        }
        const verify = await bcrypt.compare(data.password, user.password);
        if (!verify) {
            return res.status(404).json({ message: "Password not true" });
        }
        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token not available" });
        }
        if (user.role !== 1) {
            return res.status(403).json({ message: "Not allowed" });
        }
        const decoded = await jwt.verify(refreshToken, refreshTokenSecret, { ignoreExpiration: true });
        if (!decoded) {
            return res.status(404).json({ message: "Not available" });
        }
        if (decoded.username !== user.username) {
            return res.status(403).json({ message: "Not allowed" });
        }
        console.log(decoded.refresh_token);
        console.log(user.refreshToken);

        if (refreshToken !== user.refreshToken) {
            return res.status(406).json({ message: "Not allowed" });
        }
        const dataforRefreshToken = randToken.generate(12);
        const refreshTokenNew = jwt.sign({ refresh_token: dataforRefreshToken }, refreshTokenSecret, { expiresIn: refreshTokenLife });
        if (!refreshTokenNew) {
            return res.status(500).json({ message: "System error" });
        }
        await user_model.findOneAndUpdate({ username: user.username }, { refreshToken: refreshTokenNew })

        res.cookie("refresh_token", refreshTokenNew, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 60 * 60 * 1000 * 24 });
        return res.status(201).json({
            message: "Refresh successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}