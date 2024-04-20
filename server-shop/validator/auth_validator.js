import { validationResult, cookie } from "express-validator";

export const auth_validator = [
    cookie("access_token").escape(),
    cookie("refresh_token").escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                title: 'Validation failed',
                errors: errors.array(),
            });
        }
        next();
    }
]
