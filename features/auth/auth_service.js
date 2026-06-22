const jwt=require('jsonwebtoken');
const User=require('../models/User');
const AGE=24*60*60;
const createToken=(id)=>{
    return jwt.sign(
        {id},
        process.env.SECRET,
        {expiresIn:AGE}
    );
};
const signup=async(email,password)=>{
    const user=await User.create({
        email,
        password
    });
    const token=createToken(user._id);
    return {
        user,
        token
    };
};
const login=async(email,password)=>{
    const user=await User.login(
        email,
        password
    );
    const token=createToken(user._id);
    return {
        user,
        token
    };
};
module.exports={
    signup,
    login,
    AGE
};