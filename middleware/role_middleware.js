const is_admin=(req,res,next)=>{
    if(req.user && req.user.role === 'admin'){
        return next();
    }
    res.status(403).send('Access Denied');
};
module.exports=is_admin;