const  jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next)=>{
    try{
    // getting token from request
    const token = req.cookies.token;

    if(!token) res.status(400).json({message:"no token found"});

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;
    console.log("got token")
    next();
    }
    catch (error){
        return res.status(401).json({ message: "Invalid token" })
    }
}

module.exports = verifyToken