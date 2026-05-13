const express = require("express");
const checkFeature = require("../controller/endUserController")

const endUserRouter = express.Router();

endUserRouter.post("/end-user", checkFeature);

module.exports = endUserRouter;