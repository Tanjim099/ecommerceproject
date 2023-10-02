const { sendMail } = require("../helpers/sendMail");
const UserModel = require("../models/userModel");
const userModel = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// to register
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        req.status(404).send({
            msg: "All input fields are required"
        })
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 12) // hash password
        const newUser = await userModel({ ...req.body, password: hashedPassword })
        await newUser.save();
        sendMail(email, "Welcome to Ecommerce Project", `Hi ${name} thank you for registring`)
        res.status(200).send({
            success: true,
            msg: "User Registered Successfully",
            newUser
        })
    } catch (error) {
        res.status(501).send({
            success: false,
            msg: error.message
        })
    }

}

// to login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        req.status(404).send({
            msg: "All input fields are required"
        })
    }
    try {
        const userData = await UserModel.findOne({ email });
        const result = await bcrypt.compare(password, userData.password); // it will return true or false
        if (result) {
            const token = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET, {
                expiresIn: "24h"
            })
            res.status(200).send({
                success: true,
                msg: "You are login successfully",
                userData,
                token
            })
        }
        else {
            res.status(404).send({
                success: false,
                msg: "Wrong password, Please try again"
            })
        }
    } catch (error) {
        res.status(501).send({
            success: false,
            msg: error.message
        })
    }
}

// get user details

exports.getUserDetails = async (req, res) => {
    const { token } = req.body
    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET)
        const userDetails = await UserModel.findOne({ _id: userId })
        res.status(200).send({
            success: true,
            msg: "user data geted successfully",
            userDetails
        })
    } catch (error) {
        res.status(501).send({
            success: false,
            msg: error.message
        })
    }
}