const featureSchema = require("../model/featureFlag")

// CRUD
const getFeature = async (req, res)=>{
    try{
        const db = await featureSchema.find();
        res.status(200).json(db);
        console.log("getting feature data")
    }
    catch(error){
        res.status(500).json(error);
    }
}

const postFeature = async (req, res)=>{
    try{
        const {feature_key} = req.body;
        const orgId = req.user.orgId;
        const db = new featureSchema({
            feature_key: feature_key,
            orgId: orgId
        });
        const result = db.save();
        res.status(200).json(result);
        console.log("posting feature data")
    }
    catch(error){
        res.status(500).json(error);
    }
}

const editFeature = async (req, res)=>{
    try{
        const featureData = req.body;
        const id = req.params.featureId;
        const db = await featureSchema.findByIdAndUpdate(id, {$set: featureData}, {new: true});
        res.status(200).json(db);
        console.log("patching feature")
    }
    catch(error){
        res.status(500).json(error);
    }
}

const deleteFeature = async (req, res)=>{
    try{
        const id = req.params.featureId;
        const db = await featureSchema.findByIdAndDelete(id);
        res.status(200).json(db);
        console.log(" deleting feature")
    }
    catch(error){
        res.status(500).json(error);
    }
}


module.exports={getFeature, postFeature, editFeature, deleteFeature}