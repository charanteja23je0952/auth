const express=require("express");
const router=express.Router();
const auth_controller=require("./auth_controller");
const validate=require("../../middleware/validate");
const catchAsync=require("../../utils/catchAsync");
const { signupSchema,loginSchema }=require("./auth.schema");
router.post(
	'/signup',
	validate(signupSchema),
	catchAsync(auth_controller.signup_post)
);
router.post(
	'/login',
	validate(loginSchema),
	catchAsync(auth_controller.login_post)
);
router.get(
	'/logout',
	auth_controller.logout
);
module.exports=router;