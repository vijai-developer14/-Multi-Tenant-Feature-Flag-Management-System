const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSignUpSchema = require("../model/adminUsers");

// signup
const userSignup = async(req, res)=>{
    try{
        const {userName, email, password, orgId } = req.body;

        if (!userName || !email || !password || !orgId)
            return  res.status(400).json({message: "Please fill all the fields"});
        
        // Hashing password
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new userSignUpSchema({
            userName,
            email,
            password: hashedPassword, 
            orgId
        })
        await user.save();
        res.status(201).json({message: "User created successfully"});
    }

    catch (error){
        res.status(500).json({message: error});
    }
}

// login
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password)
            return res.status(400).json({ message: "Please fill all fields" })

        // find user
        const user = await userSignUpSchema.findOne({ email })
        if (!user)
            return res.status(400).json({ message: "User not found" })

        // compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" })

        // create JWT 
        const token = jwt.sign(
            { userId: user._id, orgId: user.orgId },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        )
        // send jwt
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "lax",
            secure: false
        })

        return res.status(200).json({ message: "Login successful" })

    } catch(error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}



module.exports = { userSignup, userLogin}