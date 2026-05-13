const featureSchema = require("../model/featureFlag");

const checkFeature = async (req, res)=>{
    try{
        const {featureId, orgId} = req.body;
        const db = await featureSchema.findOne({
            $and:[
                {_id: featureId},
                {orgId:orgId},
                {isEnabled: true}
            ]
        });
        if(!db){
            return res.status(200).json({message:"This Feature is not available"});
        }
        
        return res.status(200).json({message:"This Feature is  available"});
        
        
    }
    catch(error){
        res.status(500).json(error);
    }
}

module.exports = checkFeature 