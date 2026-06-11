const mongoose=require('mongoose');
const {isEmail}=require('validator');
const bcrypt=require('bcrypt');
const user_schema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
        },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    data: {
        type: String,
        default:''
    }
});
user_schema.pre('save', async function(next) {
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
});
user_schema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth) return user;
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};
const User=mongoose.model('user',user_schema);
module.exports=User;