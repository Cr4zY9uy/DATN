import bcrypt from "bcryptjs"
import user_model from "../models/user_model.js";
import jwt, { decode } from "jsonwebtoken"
import randToken from "rand-token"
import { filterXSS } from 'xss'
import { options } from "../paginate/options.js";
import { sendEmail } from "../nodemailer/nodemailer_config.js";
import { forget_password_form, forget_password_subject, forget_password_text } from "../form_mail/forget_password.js";

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;



export const login = async (req, res) => {
    try {
        const data = req.body;
        const user = await user_model.findOne({ email: data.email });
        if (!user) {
            return res.status(404).json({ message: "Email not existed" });
        }
        if (user.isLocked) {
            return res.status(401).json({ message: "Email is locked" });
        }
        const verify = await bcrypt.compare(data.password, user.password);
        if (!verify) {
            return res.status(404).json({ message: "Password not true" });
        }
        const dataForAccessToken = {
            username: user.username,
            role: user.role,
            user_id: user._id
        };

        const accessToken = jwt.sign(dataForAccessToken, accessTokenSecret, { expiresIn: accessTokenLife });
        if (!accessToken) {
            return res
                .status(503)
                .json({ message: 'Login fail, retry' });
        }

        const dataForRefreshToken = {
            username: user.username,
            user_id: user._id
        };
        let refreshToken = jwt.sign(dataForRefreshToken, refreshTokenSecret, { expiresIn: refreshTokenLife });
        if (!refreshToken) {
            return res
                .status(503)
                .json({ message: 'Login fail, retry' });
        }
        if (!user.refreshToken) {
            await user_model.findOneAndUpdate({ username: user.username }, { refreshToken: refreshToken })
        }
        else {
            refreshToken = user.refreshToken;
        }
        res.cookie("refresh_token", refreshToken, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 60 * 60 * 1000 * 24 });
        res.cookie("access_token", accessToken, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 60 * 60 * 1000 * 24 });
        return res.status(200).json({
            user_id: user._id,
            name: user.name,
            role: user.role,
            username: user.username,
            email: user.email
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
        const checkEmail = await user_model.findOne({ email: data.email });
        if (checkEmail) {
            return res.status(400).json({ message: "Email existed" });
        }
        const salt = await bcrypt.genSalt(12);
        const hashed = await bcrypt.hash(data.password, salt)
        data.password = hashed;
        const user = await user_model.create(data);
        if (user) {
            const dataForRefreshToken = {
                username: user.username,
                user_id: user._id
            };
            const refreshToken = jwt.sign(dataForRefreshToken, refreshTokenSecret, { expiresIn: refreshTokenLife });
            if (!refreshToken) {
                return res
                    .status(503)
                    .json({ message: 'Login fail, retry' });
            }
            if (!user.refreshToken) {
                await user_model.findOneAndUpdate({ username: user.username }, { refreshToken: refreshToken })
            }
            else {
                refreshToken = user.refreshToken;
            }
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

export const refresh_token = async (req, res) => {
    try {

        const accessToken = req.cookies.access_token;
        const refreshToken = req.cookies.refresh_token;


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
        const { user_id, role } = decoded
        const user = await user_model.findOne({ _id: user_id });
        if (!user) {
            return res.status(404).json({ message: "User not exist" });
        }

        if (refreshToken !== user.refreshToken) {
            return res.status(403).json({ message: "Not allowed" });
        }
        const checkRT = await jwt.verify(refreshToken, refreshTokenSecret);
        if (!checkRT) {
            const dataForRefreshToken = {
                username: user.username,
                user_id: user._id
            };
            const refreshTokenNew = jwt.sign(dataForRefreshToken, refreshTokenSecret, { expiresIn: refreshTokenLife });
            if (!refreshTokenNew) {
                return res
                    .status(503)
                    .json({ message: 'Login fail, retry' });
            }
            await user_model.findOneAndUpdate({ _id: user._id }, { refreshToken: refreshTokenNew })
            res.cookie("refresh_token", refreshTokenNew, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 60 * 60 * 1000 * 24 });
        }
        if (checkRT.user_id !== user.user_id || checkRT.username !== user.username)
            return res.status(403).json({ message: "Not allowed" });

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



export const getAll = async (req, res) => {
    try {
        const data = await user_model.paginate({}, options);
        if (data.totalDocs === 0) {
            return res.status(404).json({ message: "No user" });
        }
        return res.status(200).json({ ...data });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const { name, phone, email, image, role, username, password, address } = req.body
    const { user_id } = req.params
    const updatedFields = {};
    if (username) updatedFields.username = username;
    if (email) updatedFields.email = email;
    if (name) updatedFields.name = name;
    if (phone) updatedFields.phone = phone;
    if (image) updatedFields.image = image;
    if (role) updatedFields.role = role;
    if (password) updatedFields.password = password
    if (address) updatedFields.address = address
    try {
        const updatedUser = await user_model.findOneAndUpdate({ _id: user_id }, updatedFields, { new: true })
        if (updatedUser) return res.status(200).json({ ...updatedUser });
        return res.status(404).json({ message: "Not available" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const detailUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        const data = await user_model.findOne({ _id: user_id })
        return res.status(200).json({ ...data });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        const data = await user_model.findOneAndDelete({ _id: user_id })
        if (data) return res.status(200).json({ message: "Done" });
        return res
            .status(404)
            .json({ message: 'User not found' });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const forgetPassword = async (req, res) => {
    const { email } = req.body;
    const from = process.env.NODEMAILER_EMAIL
    try {
        const data = await user_model.findOne({ email: email })
        if (data.isLocked) {
            return res.status(401).json({ message: "Email is locked" });
        }
        if (data) {
            const dataForRefreshToken = {
                username: data.username,
                user_id: data._id
            };
            const resetPasswordToken = jwt.sign(dataForRefreshToken, refreshTokenSecret, { expiresIn: 1000 * 60 * 10 });
            await sendEmail(from, email, forget_password_subject, forget_password_text, forget_password_form(resetPasswordToken))
            return res.status(200).json({ message: "Send email successfully" });
        }
        return res.status(503).json({ message: 'Email not existed' });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const resetPassword = async (req, res) => {
    const { password, token } = req.body
    try {
        const { username, user_id } = jwt.verify(token, refreshTokenSecret)
        if (user_id) {
            const salt = await bcrypt.genSalt(12);
            const hashed = await bcrypt.hash(password, salt)
            const data = await user_model.findOneAndUpdate({ _id: user_id, username: username }, { password: hashed }, { new: true })
            if (data) {
                return res.status(200).json({ message: "Reset password successfully" });
            }
            return res.status(503).json({ message: 'Reset password successfully' });
        }
        return res.status(503).json({ message: 'Overtime request' });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getCurrentUser = async () => {
    try {
        return
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}