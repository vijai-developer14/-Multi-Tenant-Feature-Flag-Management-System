const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    }
},{ 
    timestamps: true,
    collection:"organizations" 
})

module.exports = mongoose.model("organizations", orgSchema)