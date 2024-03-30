import { check, body, validationResult } from "express-validator";

export const register_validator = [
    body("username")
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3, max: 50 }).withMessage("Username must be at least 3 characters and max 50 characters"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6, max: 50 }).withMessage("Password has at least 6 characters and max 50 characters"),
    body("confirm_password")
        .notEmpty().withMessage("Confirm password is required")
        .isLength({ min: 6, max: 50 }).withMessage("Confirm password has at least 6 characters and max 50 characters")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Confirm pasword is not match');
            }
            return true;
        }),
    body("name")
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 6, max: 50 }).withMessage("Name has at least 5 characters and max 50 characters"),
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


export const login_validator = [
    body("username")
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3, max: 50 }).withMessage("Username must be at least 3 characters and max 50 characters"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6, max: 50 }).withMessage("Password has at least 6 characters and max 50 characters"),
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
