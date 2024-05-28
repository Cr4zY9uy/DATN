import { body, validationResult } from "express-validator";





export const create_validator = [
    body("applyDate")
        .notEmpty().withMessage("Title is required")
        .isISO8601(),
    body("dueDate")
        .notEmpty().withMessage("Description is required")
        .isISO8601(),
    body("isActive")
        .escape()
        .notEmpty().withMessage("isActive is required"),
    body("products.*.productId")
        .escape()
        .notEmpty().withMessage("ProductId is required"),
    body("products.*.pricePromotion")
        .escape()
        .notEmpty().withMessage("Price promotion is required")
        .isFloat({ min: 0, max: 1 }).withMessage("Price promotion must be at least 0 and max 1"),
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
    body("applyDate")
        .optional()
        .notEmpty().withMessage("Title is required")
        .isISO8601(),
    body("dueDate")
        .optional()
        .notEmpty().withMessage("Description is required")
        .isISO8601(),
    body("isActive")
        .optional()
        .escape()
        .notEmpty().withMessage("isActive is required"),
    body("products.*.productId")
        .optional()
        .escape()
        .notEmpty().withMessage("ProductId is required"),
    body("products.*.pricePromotion")
        .optional()
        .escape()
        .notEmpty().withMessage("Price promotion is required")
        .isFloat({ min: 0, max: 1 }).withMessage("Price promotion must be at least 0 and max 1"),
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


