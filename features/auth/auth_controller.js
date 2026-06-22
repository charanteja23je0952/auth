const authService=require('./auth_service');
module.exports.signup_post=async(req,res)=>{
    const {email,password}=req.body;
    const {user,token}=
        await authService.signup(
            email,
            password
        );
    res.cookie(
        'jwt',
        token,
        {
            httpOnly:true,
            maxAge:authService.AGE*1000
        }
    );
    res.status(201).json({
        success:true,
		message:"Account created",
        data:{
            id:user._id
        }
    });
};
module.exports.login_post=async(req,res)=>{
    const {email,password}=req.body;
    const {user,token}=
        await authService.login(
            email,
            password
        );
    res.cookie(
        'jwt',
        token,
        {
            httpOnly:true,
            maxAge:authService.AGE*1000
        }
    );
    res.status(200).json({
        success:true,
		message:"Login successful",
        data:{
            id:user._id
        }
    });
};
module.exports.logout=(req,res)=>{
    res.cookie(
        'jwt',
        '',
        {maxAge:1}
    );
    res.status(200).json({
        success:true,
        message:'Logged out',
		data:null
    });
};