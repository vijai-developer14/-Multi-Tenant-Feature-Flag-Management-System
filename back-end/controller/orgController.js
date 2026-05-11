const jwt = require("jsonwebtoken")
const orgSchema = require("../model/organization");

// login
const superAdminLogin = async(req, res)=>{
    try{
    const {username, password } = req.body;

    if (!username || !password)
       return  res.status(400).json({message: "Please fill all the fields"})

    if(username !== process.env.SUPER_ADMIN_USER_NAME || password !== process.env.SUPER_ADMIN_USER_PASS)
        return  res.status(400).json({message: "Incorrect username or password"})

    // generating jwt token
    const payload = {
        user:{username},
        role:"admin"
    }
    const secret = process.env.SECRET_KEY
    const token = jwt.sign(
        payload,
        secret,
        {expiresIn:"1d"}
     );

     // sending jwt
    res.cookie("token", token,{
        httpOnly:true,
        maxAge:24 * 60 * 60 * 1000,
        sameSite: "lax",
        secure: false    
    })
    return  res.status(200).json({message: "Your logged in"});
    }

    catch{
        res.status(500).json({message: "login failed"});
    }
}

// CRUD
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

module.exports = {getOrg, postOrg, editOrg, deleteOrg, superAdminLogin}