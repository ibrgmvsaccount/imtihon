module.exports=function (requiredRole) {
    return (req,res,next)=>{
        const userRole=req.user.role;
        if (userRole==='SuperAdmin') return next();
        if (requiredRole.includes(userRole)) return next();
        return res.status(403).json({message:"Ruxsat yo'q"})
    };
};