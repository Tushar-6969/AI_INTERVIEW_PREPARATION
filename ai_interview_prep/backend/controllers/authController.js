

const User=require("../models/User")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")

const generateToken=(userid)=>{
return jwt.sign({id:userid},process.env.JWT_SECRET,{expiresIn:"7d"})
};


//@desc register a new user 
//route post  api/auth/register 
// @acess public 

const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body;
    console.log("Register user details:", req.body);

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
    });

    // Return user + token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error", err: err.message });
  }
};

//@desc login new user 
//route post  api/auth/login 
// @acess public 

const loginUser=async(req,res)=>{

try{
const {email,password}=req.body;
const user=await User.findOne({email})

if(!user){
return res.status(500).json({message:"invalid credntiols "})
} 

// compare password 
const ismatch=await bcrypt.compare(password,user.password)

if(!ismatch){
    return res.status(500).json({message:"invalid password "})
}

res.json({
    _id:user._id,
    name:user.name,
    email:user.email,
    profileImageUrl:user.profileImageUrl,
    token:generateToken(user._id)
})





}
catch(err){

res.status(201).json({message:"server error ",err:err.message})
}






}


//@desc get user profile 
//route post  api/auth/profile 
// @acess private (jwt require)

const getUserProfile=async(req,res)=>{

try{

const user=await User.findById(req.user.id).select("-password");
if(!user){
    return res.status(404).json({message:"user not found "})
}
res.json(user)

}
catch(err){
res.status(201).json({message:"server error ",err:err.message})    
}



}

module.exports={registerUser,loginUser,getUserProfile}

