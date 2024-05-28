import { body, validationResult } from "express-validator";

export const add_product_validator = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 3, max: 50 }).withMessage("Name has at least 3 characters and maximum 50 characters"),
    body("price")
        .notEmpty().withMessage("Price is required")
        .isFloat({ min: 1 }).withMessage("Price  has value min 1"),
    body("images")
        .notEmpty().withMessage("Images is required")
        .isArray({ min: 1 }).withMessage("Images must be an array"),
    body("categoryId")
        .notEmpty().withMessage("Category is required"),
    body("isActive")
        .escape()
        .notEmpty().withMessage("isActive is required"),
    body("description")
        .notEmpty().withMessage("Description is required")
        .isLength({ min: 5, max: 300 }).withMessage("Description has at least 5 characters and maximum 300 characters"),
    body("origin")
        .notEmpty().withMessage("Description is required")
        .isLength({ min: 5, max: 300 }).withMessage("Description has at least 5 characters and maximum 300 characters"),
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
];


export const edit_product_validator = [
    body("name")
        .optional()
        .isLength({ min: 3, max: 50 }).withMessage("Name has at least 3 characters and maximum 50 characters"),
    body("price")
        .optional()
        .isFloat({ min: 1 }).withMessage("Price  has value min 1"),
    body("images")
        .optional()
        .isArray({ min: 1 }).withMessage("Images must be an array"),
    body("categoryId")
        .optional(),
    body("isActive")
        .escape()
        .optional(),
    body("description")
        .optional()
        .isLength({ min: 5, max: 300 }).withMessage("Description has at least 5 characters and maximum 300 characters"),
    body("origin")
        .optional()
        .isLength({ min: 5, max: 300 }).withMessage("Description has at least 5 characters and maximum 300 characters"),
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