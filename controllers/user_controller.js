const User = require('../models/User');
module.exports.profile=async(req,res)=>{
    res.render('profile',{
        user:req.user
    });
};
module.exports.edit_get=async(req,res)=>{
    res.render('edit',{
        user:req.user
    });
};
module.exports.edit_post=async(req,res)=>{
    const { email, data } = req.body;
    await User.findByIdAndUpdate(
        req.user._id,
        {
            email,
            data
        }
    );
    res.redirect('/profile');
};