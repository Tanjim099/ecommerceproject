const express = require("express");
const { registerUser, loginUser, getUserDetails } = require("../controllers/userController");


const UserRouter = express.Router();

// register router
UserRouter.post("/register", registerUser);

// login router
UserRouter.post("/login", loginUser);

// get user details
UserRouter.post("/details", getUserDetails)
module.exports = UserRouter