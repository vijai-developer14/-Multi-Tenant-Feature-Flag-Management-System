const orgSchema = require("../model/organization")

const getOrg = async (req, res)=>{
    try{
        const db = await orgSchema.find();
        res.status(200).json(db);
        console.log("getorg getting data")
    }
    catch(error){
        res.status(500).json(error);
    }
}

const postOrg = async (req, res)=>{
    try{
        const orgData = req.body;
        const db = new orgSchema(orgData);
        const result = db.save();
        res.status(200).json(result);
        console.log("getorg posting data")
    }
    catch(error){
        res.status(500).json(error);
    }
}

const editOrg = async (req, res)=>{
    try{
        const orgData = req.body;
        const id = req.params.orgId;
        const db = await orgSchema.findByIdAndUpdate(id, {$set: orgData}, {new: true});
        res.status(200).json(db);
        console.log("getorg patching data")
    }
    catch(error){
        res.status(500).json(error);
    }
}

const deleteOrg = async (req, res)=>{
    try{
        const id = req.params.orgId;
        const db = await orgSchema.findByIdAndDelete(id);
        res.status(200).json(db);
        console.log("getorg deleting data")
    }
    catch(error){
        res.status(500).json(error);
    }
}

module.exports = {getOrg, postOrg, editOrg, deleteOrg}