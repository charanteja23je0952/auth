const jwt=require('jsonwebtoken');
const User=require('../models/User');
const require_auth=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.SECRET,(err,decoded_token)=>{
            if(err){
                res.redirect('/login');
            }
            else next();
        });
    }
    else{
        res.redirect('/login');
    }
};
const check_user=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.SECRET,async(err,decoded_token)=>{
            if(err){
                req.user=null;
                res.locals.user=null;
                next();
            }
            else{
                let user=await User.findById(decoded_token.id);
                req.user=user;
                res.locals.user=user;
                next();
            }
        });
    }
    else{
        req.user=null;
        res.locals.user=null;
        next();
    }
};
module.exports={require_auth,check_user};