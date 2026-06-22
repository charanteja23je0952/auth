const User = require('../models/User');
module.exports.profile=async(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Profile fetched successfully",
        data:{
            id:req.user._id,
            email:req.user.email,
            role:req.user.role,
            data:req.user.data
        }
    });
};
module.exports.edit_post=async(req,res)=>{
    const { email, data } = req.body;
    const user=await User.findByIdAndUpdate(
        req.user._id,
        {
            email,
            data
        },
        {new:true}
    );
    res.status(200).json({
        success:true,
        message:"Profile updated successfully",
        data:{
            id:user._id,
            email:user.email,
            role:user.role,
            data:user.data
        }
    });
};