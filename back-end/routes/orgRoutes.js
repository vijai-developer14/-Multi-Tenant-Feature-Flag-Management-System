const express = require("express");

const {getOrg, postOrg, editOrg, deleteOrg}=require("../controller/orgController")

const orgRoutes = express.Router();

orgRoutes.get("/api/organizations", getOrg)
orgRoutes.post("/api/organizations", postOrg)
orgRoutes.patch("/api/organizations/:orgId", editOrg)
orgRoutes.delete("/api/organizations/:orgId", deleteOrg)

module.exports = orgRoutes