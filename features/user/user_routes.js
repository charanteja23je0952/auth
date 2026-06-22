const express=require('express');
const router=express.Router();
const user_controller=require('./user_controller');
const {require_auth}=require('../../middleware/auth_middlware');
router.get(
    '/profile',
    require_auth,
    catchAsync(user_controller.profile)
);
router.post(
    '/profile/edit',
    require_auth,
    catchAsync(user_controller.edit_post)
);
module.exports=router;