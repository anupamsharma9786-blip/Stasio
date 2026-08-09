import {body , validationResult} from "express-validator";

function validation(req, res ,next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors.array()
        });
    }
    next();
}


export const validateRegisterUser = [
    body("email").isEmail().withMessage("Please provide a valid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("fullname").notEmpty().withMessage("Full name is required"),
    body("contact").notEmpty().withMessage("Contact is required").matches(/^\d{10}$/).withMessage("Contact must be a valid 10-digit number"),
    validation
]