const mongoose = require('mongoose');

// Organization Admin

const userSignUpSchema =  new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: { type: String,
         required: true 
    },
    orgId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organisation"
    }
},{ 
    timestamps: true,
    collection:"users" 
})

module.exports = mongoose.model("users", userSignUpSchema);