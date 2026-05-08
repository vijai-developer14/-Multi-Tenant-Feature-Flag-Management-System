const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")

const dbConnect = require("./config/db");
const orgRoutes = require("./routes/orgRoutes")

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

dbConnect();

app.use("/test", orgRoutes)
app.listen(`${process.env.PORT}`,()=>{
    console.log("app connected to" + ` ${process.env.PORT}`)
})