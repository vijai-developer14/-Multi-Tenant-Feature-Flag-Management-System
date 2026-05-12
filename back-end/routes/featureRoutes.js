const express = require("express");
const verifyToken = require("../middleware/checkAuth")
const {getFeature, postFeature, editFeature, deleteFeature}=require("../controller/featureController")

const featureRoutes = express.Router();

// public route
featureRoutes.get("/public/featurtes", getFeature)

// private
featureRoutes.get("/features", verifyToken, getFeature)
featureRoutes.post("/features", verifyToken, postFeature)
featureRoutes.patch("/features/:featureId", verifyToken, editFeature)
featureRoutes.delete("/features/:featureId", verifyToken, deleteFeature)

module.exports = featureRoutes