const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();
const cookieparser=require('cookie-parser');
const auth_routes=require('./features/auth/auth_routes');
const user_routes=require('./features/user/user_routes');
const admin_routes=require('./features/admin/admin_routes');
const {check_user}=require('./middleware/auth_middlware');
const errorHandler=require('./middleware/errorHandler');
const app=express();
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(cookieparser());
const DB_URL=process.env.DB_URL;
mongoose.connect(DB_URL)
    .then((result)=>app.listen(3000))
    .catch((err)=>console.log(err));
app.use(check_user);
app.use(auth_routes);
app.use(user_routes);
app.use(admin_routes);
app.use(errorHandler);
