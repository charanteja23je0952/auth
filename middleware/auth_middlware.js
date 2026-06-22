const jwt=require('jsonwebtoken');
const User=require('../models/User');
const require_auth=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.SECRET,(err,decoded_token)=>{
            if(err){
                return res.status(401).json({
                    success:false,
                    message:'Invalid token',
                    data:null
                });
            }
            else next();
        });
    }
    else{
        return res.status(401).json({
            success:false,
            message:'Authentication required',
            data:null
        });
    }
};
const check_user=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.SECRET,async(err,decoded_token)=>{
            if(err){
                req.user=null;
                next();
            }
            else{
                let user=await User.findById(decoded_token.id);
                req.user=user;
                next();
            }
        });
    }
    else{
        req.user=null;
        next();
    }
};
module.exports={require_auth,check_user};