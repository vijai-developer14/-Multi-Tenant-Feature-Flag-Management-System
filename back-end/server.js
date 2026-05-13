const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const cookieParser = require("cookie-parser")


const dbConnect = require("./config/db");
const orgRoutes = require("./routes/orgRoutes")
const userRoutes = require("./routes/userRoutes")
const featureRoutes = require("./routes/featureRoutes")
const endUserRouter = require("./routes/endUserRouter")


const app = express();
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
    ],
    credentials: true  
}))
app.use(express.json());
dotenv.config();
app.use(cookieParser());

dbConnect();

app.use("/api", orgRoutes);
app.use("/user", userRoutes);
app.use("/feature-flags", featureRoutes);
app.use("/users", endUserRouter);

app.listen(`${process.env.PORT}`,()=>{
    console.log("app connected to" + ` ${process.env.PORT}`)
})