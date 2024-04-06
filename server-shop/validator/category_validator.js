import { body, validationResult } from "express-validator";

export const add_category_validator = [
    body("category_id")
        .notEmpty().withMessage("Category Id is required")
        .isLength({ min: 4, max: 10 }).withMessage("Category Id must be at least 4 characters and max 10 characters"),
    body("name")
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 6, max: 50 }).withMessage("Name has at least 6 characters and max 50 characters"),
    body("image")
        .notEmpty().withMessage("Image is required"),
    body("description")
        .notEmpty().withMessage("Description is required")
        .isLength({ min: 6, max: 300 }).withMessage("Description has at least 6 characters and max 300 characters"),
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

export const edit_category_validator = [

    body("name")
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 6, max: 50 }).withMessage("Name has at least 6 characters and max 50 characters"),
    body("description")
        .notEmpty().withMessage("Description is required")
        .isLength({ min: 6, max: 300 }).withMessage("Description has at least 6 characters and max 300 characters"),
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
