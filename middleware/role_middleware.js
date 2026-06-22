const is_admin=(req,res,next)=>{
    if(req.user && req.user.role === 'admin'){
        return next();
    }
    res.status(403).json({
        success:false,
        message:"Forbidden",
        errors:{
            role:"Admin access required"
        }
    });
};
module.exports=is_admin;