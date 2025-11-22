const jwt = require('jsonwebtoken');
const users=require('../models/userModel')
const bcrypt = require('bcrypt')

// register
exports.registerController=async (req,res)=>{
  console.log("inside register controller");
  const {username,email,password}=req.body
try{
  const existingUser = await users.findOne({email})
  if(existingUser){
    res.status(409).json("already exist")
  }else{
    const encryptPassword = await bcrypt.hash(password,10)
    const newUser= new users({
      username,email,password:encryptPassword,profile:""
    })
    await newUser.save()
      res.status(200).json(newUser)

  }

}catch(err){
  res.status(500).json(err)
}
  
}

//login
exports.loginController=async(req,res)=>{
console.log("inside loginController");
 const {email,password}=req.body
   
try{
const existingUser = await users.findOne({email})
if(existingUser){
  if(existingUser.role=="user"){
   let isUserLoggedin = existingUser.role=="user"?await bcrypt.compare(password,existingUser.password)
   : password == existingUser.password
   if(isUserLoggedin){
    const token = jwt.sign({ email, role: existingUser.role }, process.env.JWTSECRET)
      res.status(200).json({user:existingUser,token})

   }
    // const token = jwt.sign({email,role:existingUser.role},process.env.JWTSECRET)
    
  }else{
  res.status(404).json("invalid email/password")

  }

}else{
 res.status(404).json("invalid email...... please register to access our app")
 
}
}catch(err){
res.status(500).json(err)
}
}







