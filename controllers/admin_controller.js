const User=require('../models/User');
module.exports.admin=async(req,res)=>{
	const users=await User.find();
	res.render('admin',{
		users
	});
};
module.exports.admin_id=async(req,res)=>{
	const user=await User.findById(req.params.id);
	if(!user){
		return res.redirect('/admin');
	}
	res.render('profile',{
		user
	});
};
module.exports.edit_get=async(req,res)=>{
	const user=await User.findById(req.params.id);
	if(!user){
		return res.redirect('/admin');
	}
	res.render('admin_edit',{
		user
	});
};
module.exports.edit_post=async(req,res)=>{
	const {email,role,data}=req.body;
	await User.findByIdAndUpdate(
		req.params.id,
		{
			email,
			role,
			data
		}
	);
	res.redirect('/admin');
};
module.exports.delete=async(req,res)=>{
	await User.findByIdAndDelete(req.params.id);
	res.redirect('/admin');
};