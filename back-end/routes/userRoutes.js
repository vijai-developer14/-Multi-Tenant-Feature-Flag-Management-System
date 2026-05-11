const express = require("express");
const {userSignup, userLogin} = require("../controller/userController");
const {verifyOrgAuth} = require("../controller/authController")
const verifyToken = require("../middleware/checkAuth")
const userRoutes = express.Router();

// verify org user
userRoutes.get("/verifyOrg", verifyToken, verifyOrgAuth)

userRoutes.post("/signup", userSignup);
userRoutes.post("/login", userLogin);

module.exports=userRoutes