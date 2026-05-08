const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = async ()=>{
    try{
        const conn = await  mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected using Mongoose");
    }
    catch (error){
        console.log(error);
        process.exit(1);
    }
}

module.exports = dbConnect;