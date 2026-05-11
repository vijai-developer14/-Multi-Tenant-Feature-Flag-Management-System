// super admin url protect
const verifyAuth = async (req, res) => {
    try{
        res.status(200).json({ message: "Authenticated" });
    }
    catch(error){
        res.status(400).json({ message: "Not Authenticated" })
    }
}

// organisation admin url protect
const verifyOrgAuth = async (req, res) => {
    try{
        res.status(200).json({ message: "Organisation Authenticated" });
    }
    catch(error){
        res.status(400).json({ message: "Organisation not Authenticated" })
    }
}

module.exports = { verifyAuth, verifyOrgAuth };