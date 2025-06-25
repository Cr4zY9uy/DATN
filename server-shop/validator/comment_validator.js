import { body, validationResult } from "express-validator";





export const create_validator = [
    body("content")
        .notEmpty().withMessage("Content is required")
        .isLength({ min: 3, max: 150 }).withMessage("Content must be at least 3 characters and max 150 characters"),
    body("productId")
        .notEmpty().withMessage("ProductId is required"),
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



export const edit_validator = [

    body("isActive")
        .optional({ values: "falsy" })
        .notEmpty().withMessage("isActive is required"),
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


