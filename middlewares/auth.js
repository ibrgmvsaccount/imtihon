const jwt=require('jsonwebtoken');
const { error } = require('winston');

module.exports=function (req,res,next) {
    const authHeader=req.headers['authorization'];
    const token=authHeader&&authHeader.split(' ')[1];
    if (!token) return res.status(401).json({message:'Token is required'});
    jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{
        if (error) return res.status(403).json({message:"Token noto'g'ri"});
        req.user=user;
        next();
    });
};