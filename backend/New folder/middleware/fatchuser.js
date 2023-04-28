var jwt = require("jsonwebtoken");
const jwt_secrit = "hellobradar@hellobradar";

const fatchuser = (req,res,next)=>{
    const token  =req.header('auth-token');

    if(!token){
        res.status(401).send({error:"Please enter  vailed token"});
    }

    try {
        
        const data = jwt.verify(token,jwt_secrit);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Please enter  vailed token"});
    }
}

module.exports = fatchuser;