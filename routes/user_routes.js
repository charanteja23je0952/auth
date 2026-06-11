const express=require('express');
const router=express.Router();
const user_controller=require('../controllers/user_controller');
const {require_auth}=require('../middleware/auth_middlware');
router.get('/profile',require_auth,user_controller.profile);
router.get('/profile/edit',require_auth,user_controller.edit_get);
router.post('/profile/edit',require_auth,user_controller.edit_post);
module.exports=router;