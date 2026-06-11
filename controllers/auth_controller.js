const jwt=require('jsonwebtoken');
const User=require('../models/User');
const handleErrors=(err)=>{
	console.log(err.message,err.code);
	let errors={email:'',password:''};
	if(err.message==='incorrect email'){
		errors.email='That email is not registered';
	}
	if(err.message==='incorrect password'){
		errors.password='That password is incorrect';
	}
	if(err.code===11000){
		errors.email='that email is already registered';
		return errors;
	}
	if(err.message.includes('user validation failed')){
		Object.values(err.errors).forEach(({properties})=>{
			errors[properties.path]=properties.message;
		});
	}
	return errors;
};
const age=24*60*60;
const createtoken=(id)=>{
	return jwt.sign({id},process.env.SECRET,{expiresIn:age});
};
module.exports.signup_get=(req,res)=>{
	res.render('signup',{
		errors:{
			email:'',
			password:''
		}
	});
};
module.exports.login_get=(req,res)=>{
	res.render('login',{
		errors:{
			email:'',
			password:''
		}
	});
};
module.exports.signup_post=async(req,res)=>{
	const {email,password}=req.body;
	try{
		const user=await User.create({email,password});
		const token=createtoken(user._id);
		res.cookie('jwt',token,{httpOnly:true,maxAge:age*1000});
		res.redirect('/profile');
	}
    catch(err){
		const errors=handleErrors(err);
		res.render('signup',{errors});
	}
};
module.exports.login_post=async(req,res)=>{
	const {email,password}=req.body;
	try{
		const user=await User.login(email,password);
		const token=createtoken(user._id);
		res.cookie('jwt',token,{httpOnly:true,maxAge:age*1000});
		res.redirect('/profile');
	}
    catch(err){
		const errors=handleErrors(err);
		res.render('login',{errors});
	}
};
module.exports.logout=(req,res)=>{
	res.cookie('jwt','',{maxAge:1});
	res.redirect('/login');
};