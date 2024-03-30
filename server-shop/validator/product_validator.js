import { body, validationResult } from "express-validator";

export const add_product_validator = [
    body("product_id")
        .notEmpty().withMessage("Product id is required")
        .isLength({ min: 5, max: 10 }).withMessage("Product id must be at least 5 characters and maximum 10 characters"),
    body("title")
        .notEmpty().withMessage("Title is required")
        .isLength({ min: 3, max: 50 }).withMessage("Title has at least 3 characters and maximum 50 characters"),
    body("price")
        .notEmpty().withMessage("Price is required")
        .isFloat({ min: 1 }).withMessage("Price  has value min 1"),
    body("thumbnail")
        .notEmpty().withMessage("Thumbnail is required"),
    body("qty")
        .notEmpty().withMessage("Quantity is required")
        .isInt({ min: 0 }).withMessage("Quantity has min value 0"),
    body("category_name")
        .notEmpty().withMessage("Category name is required")
        .isLength({ min: 5, max: 50 }).withMessage("Title has at least 5 characters and maximum 50 characters"),
    body("price_promotion")
        .notEmpty().withMessage("Price promotion is required")
        .isFloat({ min: 0, max: 1 }).withMessage("Price promotion has value greater than 0 and  less than  1"),
    body("status")
        .notEmpty().withMessage("Status is required")
        .isIn([0, 1]).withMessage("Status has value  0 or 1"),
    body("description")
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

    body("title")
        .notEmpty().withMessage("Title is required")
        .isLength({ min: 3, max: 50 }).withMessage("Title has at least 3 characters and maximum 50 characters"),
    body("price")
        .notEmpty().withMessage("Price is required")
        .isFloat({ min: 1 }).withMessage("Price  has value min 1"),
    body("qty")
        .notEmpty().withMessage("Quantity is required")
        .isInt({ min: 0 }).withMessage("Quantity has min value 0"),
    body("category_name")
        .notEmpty().withMessage("Category name is required")
        .isLength({ min: 5, max: 50 }).withMessage("Title has at least 5 characters and maximum 50 characters"),
    body("price_promotion")
        .notEmpty().withMessage("Price promotion is required")
        .isFloat({ min: 0, max: 1 }).withMessage("Price promotion has value greater than 0 and  less than  1"),
    body("status")
        .notEmpty().withMessage("Status is required")
        .isIn([0, 1]).withMessage("Status has value  0 or 1"),
    body("description")
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
]