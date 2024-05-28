import { body, validationResult } from "express-validator";


export const create_validator = [
    body("content")
        .notEmpty().withMessage("Content is required")
        .isLength({ min: 3 }).withMessage("Content must be at least 3 characters"),
    body("roomId")
        .notEmpty().withMessage("RoomId is required"),
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


