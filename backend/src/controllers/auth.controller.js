import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { config } from "dotenv";

async function sendTokenResponse(user, res) {

    const token = await jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        config.JWT_SECRET,
        { expiresIn: "7d", },
    );

    res.cookie("token", token)

}

export const register = async (req, res) => {
    const { email, fullname, contact, password, role } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await userModel.findOne({
            $or: [
                { email: email },
                { contact: contact }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }


        const user = await userModel.create({
            email,
            fullname,
            contact,
            password,
            role

        })

        await sendTokenResponse(user, res);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                email: user.email,
                fullname: user.fullname,
                contact: user.contact,
                role: user.role
            }
        });



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while checking user",
        });
    }
};

export const login = async (req, res) => {
    // Implementation for user login
};
