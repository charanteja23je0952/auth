const errorHandler=(err,req,res,next)=>{
    console.log(err);
    let statusCode=err.statusCode || 500;
    let errors={};
    if(err.code===11000){
        statusCode=400;
        errors.email="Email already exists";
    }
    if(err.message==="incorrect email"){
        statusCode=400;
        errors.email="That email is not registered";
    }
    if(err.message==="incorrect password"){
        statusCode=400;
        errors.password="That password is incorrect";
    }
    if(err.message.includes("user validation failed")){
        statusCode=400;
        Object.values(err.errors)
            .forEach(({properties})=>{
                errors[properties.path]=properties.message;
            });
    }
    res.status(statusCode).json({
        success:false,
        message:err.message,
        errors
    });
};

module.exports=errorHandler;