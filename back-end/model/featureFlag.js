const mongoose = require('mongoose');

const featureSchema =  new mongoose.Schema({
    feature_key: { 
        type: String,
        required: true 
    },
    isEnabled: { 
        type: Boolean,
        default: false 
        },
    orgId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Organisation" 
    }
},{ 
    timestamps: true,
    collection:"featureFlag" 
})

module.exports = mongoose.model("featureFlag", featureSchema);