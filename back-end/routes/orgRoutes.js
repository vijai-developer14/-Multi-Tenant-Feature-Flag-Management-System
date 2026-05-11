const express = require("express");
const verifyToken = require("../middleware/checkAuth")
const {verifyAuth} = require("../controller/authController")

const {getOrg, postOrg, editOrg, deleteOrg, superAdminLogin}=require("../controller/orgController")

const orgRoutes = express.Router();

// login
orgRoutes.post("/superadminlogin", superAdminLogin)

// verify user
orgRoutes.get("/verify", verifyToken, verifyAuth)

// public
orgRoutes.get("/organizations/public", getOrg)

// private
orgRoutes.get("/organizations", verifyToken, getOrg)
orgRoutes.post("/organizations", verifyToken, postOrg)
orgRoutes.patch("/organizations/:orgId", verifyToken, editOrg)
orgRoutes.delete("/organizations/:orgId", verifyToken, deleteOrg)

module.exports = orgRoutes