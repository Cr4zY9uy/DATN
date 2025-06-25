import { body, validationResult } from "express-validator";





export const create_validator = [

    body("importDate")
        .notEmpty().withMessage("Import date is required")
        .isISO8601(),
    body("money")
        .notEmpty().withMessage("Money is required")
        .isInt({ min: 1 }).withMessage("Money is at least 1"),
    body("products.*.productId")
        .escape()
        .notEmpty().withMessage("ProductId is required"),
    body("products.*.quantity")
        .escape()
        .notEmpty().withMessage("ProductId is required")
        .isInt({ min: 1 }).withMessage("Money is at least 1"),
    body("products.*.importMoney")
        .escape()
        .notEmpty().withMessage("ProductId is required")
        .isInt({ min: 1 }).withMessage("Money is at least 1"),
    body("products.*.expireDate")
        .escape()
        .notEmpty().withMessage("Price promotion is required")
        .isISO8601(),
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

    body("importDate")
        .optional()
        .notEmpty().withMessage("Import date is required")
        .isISO8601(),
    body("money")
        .optional()
        .notEmpty().withMessage("Money is required")
        .isInt({ min: 1 }).withMessage("Money is at least 1"),
    body("products.*.productId")
        .optional()
        .escape()
        .notEmpty().withMessage("ProductId is required"),
    body("products.*.quantity")
        .optional()
        .escape()
        .notEmpty().withMessage("ProductId is required")
        .isInt({ min: 1 }).withMessage("Money is at least 1"),
    body("products.*.importMoney")
        .optional()
        .escape()
        .notEmpty().withMessage("ProductId is required")
        .isInt({ min: 1 }).withMessage("Money is at least 1"),
    body("products.*.expireDate")
        .optional()
        .escape()
        .notEmpty().withMessage("Price promotion is required")
        .isISO8601(),
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


