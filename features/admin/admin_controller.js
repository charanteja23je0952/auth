const User=require('../models/User');
module.exports.admin=async(req,res)=>{
	const users=await User.find();
	res.status(200).json({
		success:true,
		message:"Users fetched successfully",
		data:users.map(user=>({
			id:user._id,
			email:user.email,
			role:user.role
		}))
	});
};
module.exports.admin_id=async(req,res)=>{
	const user=await User.findById(req.params.id);
	if(!user){
		return res.status(404).json({
			success:false,
			message:"User not found",
			data:null
		});
	}
	res.status(200).json({
		success:true,
		message:"User fetched successfully",
        data:{
            id:user._id,
            email:user.email,
            role:user.role,
            data:user.data
        }
	});
};
module.exports.edit_get=async(req,res)=>{
	const user=await User.findById(req.params.id);
	if(!user){
		return res.status(404).json({
			success:false,
			message:"User not found"
		});
	}
	res.status(200).json({
		success:true,
		message:"User fetched successfully",
		data:{
			id:user._id,
			email:user.email,
			role:user.role,
			data:user.data
		}
	});
};
module.exports.edit_post=async(req,res)=>{
	const {email,role,data}=req.body;
	const user=await User.findByIdAndUpdate(
		req.params.id,
		{
			email,
			role,
			data
		},
		{new:true}
	);
	if(!user){
		return res.status(404).json({
			success:false,
			message:"User not found",
			data:null
		});
	}
	res.status(200).json({
		success:true,
		message:"User updated successfully",
        data:{
            id:user._id,
            email:user.email,
            role:user.role,
            data:user.data
        }
	});
};
module.exports.delete=async(req,res)=>{
	const user=await User.findByIdAndDelete(req.params.id);
	if(!user){
		return res.status(404).json({
			success:false,
			message:"User not found",
			data:null
		});
	}
	res.status(200).json({
		success:true,
		message:"User deleted successfully",
		data:null
	});
};