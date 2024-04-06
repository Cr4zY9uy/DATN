import { body, validationResult } from "express-validator";

export const add_order_validator = [
    body("order_id")
        .notEmpty().withMessage("Order id is required")
        .isLength({ min: 5, max: 15 }).withMessage("Order id must be at least 5 characters and maximum 15 characters"),
    body("first_name")
        .notEmpty().withMessage("First name is required")
        .isLength({ min: 3, max: 20 }).withMessage("First name has at least 3 characters and maximum 20 characters"),
    body("last_name")
        .notEmpty().withMessage("Last name is required")
        .isLength({ min: 3, max: 20 }).withMessage("Last name has at least 3 characters and maximum 20 characters"),
    body("phone")
        .notEmpty().withMessage("Phone is required")
        .isLength({ min: 10, max: 12 }).withMessage("Phone name has at least 3 characters and maximum 12 characters"),
    body("email")
        .notEmpty().withMessage("Email is required")
        .isLength({ min: 10, max: 25 }).withMessage("Email name has at least 3 characters and maximum 25 characters"),
    body("address")
        .notEmpty().withMessage("Address id is required")
        .isLength({ min: 5, max: 35 }).withMessage("Address id must be at least 5 characters and maximum 35 characters"),
    body("country")
        .notEmpty().withMessage("Country is required")
        .isLength({ min: 3, max: 25 }).withMessage("Country has at least 3 characters and maximum 25 characters"),
    body("note")
        .isLength({ min: 3, max: 300 }).withMessage("Note has at least 3 characters and maximum 300 characters"),
    body("payment_method")
        .notEmpty().withMessage("Payment method is required")
        .isIn(['Credit card', 'Paypal', 'COD']).withMessage("Payment method must be in regulation"),
    body("shipping_method")
        .notEmpty().withMessage("Shipping method is required")
        .isIn(['Express', 'Free', 'Standard']).withMessage("Shipping method must be in regulation"),
    body("payment_status")
        .notEmpty().withMessage("Payment status is required")
        .isIn(['Unpaid', 'Partial payment', 'Paid', 'Return']).withMessage("Payment status must be in regulation"),
    body("shipping_status")
        .notEmpty().withMessage("Shipping status is required")
        .isIn(['Not sent', 'Sending', 'Shipping done']).withMessage("Shipping status must be in regulation"),
    body("order_status")
        .notEmpty().withMessage("Order status is required")
        .isIn(['New', 'Processing', 'Hold', 'Canceled', 'Done', 'Failed']).withMessage("Order status must be in regulation"),
    body("shipping_cost")
        .isFloat({ min: 0 }).withMessage("Shipping cost has value min 0"),
    body("*.product_id")
        .notEmpty().withMessage("Product id is required")
        .isLength({ min: 5, max: 10 }).withMessage("Product id has at least 3 characters and maximum 25 characters"),
    body("*.thumbnail")
        .notEmpty().withMessage("Thumbnail is required"),
    body("*.price")
        .notEmpty().withMessage("Price is required")
        .isFloat({ min: 1 }).withMessage("Price has min value 1"),
    body("*.quantity")
        .notEmpty().withMessage("Quantity is required")
        .isInt({ min: 1 }).withMessage("Quantity has min value 1"),
    body("*.price_promotion")
        .notEmpty().withMessage("Price promotion is required")
        .isFloat({ min: 0, max: 1 }).withMessage("Price promotion has value greater than 0 and  less than  1"),
    body("*.tax")
        .notEmpty().withMessage("Tax is required")
        .isFloat({ min: 0, max: 1 }).withMessage("Price promotion has value greater than 0 and  less than  1"),
    body("*.title")
        .notEmpty().withMessage("Title id is required")
        .isLength({ min: 3, max: 50 }).withMessage("Title has at least 3 characters and maximum 50 characters"),
    body("discount")
        .isFloat({ min: 0, max: 1 }).withMessage("Discount has value between 0 and 1"),
    body("other_fee")
        .isFloat({ min: 0 }).withMessage("Other fee has value min 0"),
    body("received")
        .isFloat({ min: 0 }).withMessage("Received  has value min 0"),
    body("balance")
        .isFloat({ min: 0 }).withMessage("Balance has value min 0"),
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
export const edit_order_validator = [
    body("payment_status")
        .notEmpty().withMessage("Payment status is required")
        .isIn(['Unpaid', 'Partial payment', 'Paid', 'Return']).withMessage("Payment status must be in regulation"),
    body("shipping_status")
        .notEmpty().withMessage("Shipping status is required")
        .isIn(['Not sent', 'Sending', 'Shipping done']).withMessage("Shipping status must be in regulation"),
    body("order_status")
        .notEmpty().withMessage("Order status is required")
        .isIn(['New', 'Processing', 'Hold', 'Canceled', 'Done', 'Failed']).withMessage("Order status must be in regulation"),
    body("shipping_cost")
        .isFloat({ min: 0 }).withMessage("Shipping cost has value min 0"),
    body("discount")
        .isFloat({ min: 0, max: 1 }).withMessage("Discount has value between 0 and 1"),
    body("other_fee")
        .isFloat({ min: 0 }).withMessage("Other fee has value min 0"),
    body("received")
        .isFloat({ min: 0 }).withMessage("Received  has value min 0"),
    body("balance")
        .isFloat({ min: 0 }).withMessage("Balance has value min 0"),
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
