const jwt = require('jsonwebtoken')
const jwtMiddleware = (req,res,next)=>{
 console.log("inside jwtmiddleware");
 const token = req.headers['Authorization'].split("")[1]
 if(token){
  try{
    const jwtResponse = jwt.verify(token,process.env.JWTSECRET)
    req.role = jwtResponse.role
    req.payload = jwtMiddleware.email
    next()
  }catch(err){
    res.status(500).json(err)
  }
 }else{
 res.status(404).json("authorization failed")
 }
}
module.exports=jwtMiddleware