import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema =new mongoose.Schema({
    name:{
        type : String,
        required:[true,"Please Enter your name"],
        maxLength:[25,"Invalid Name. Plase Enter a name less than 25 Characters"],
        minLength:[3,"Name should contain more than 3 characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter Valid Email"]

    },
    password:{
    type:String,
    required:[true,"Please Enter your Password"],
    minLength:[8,"Password should be Greater Than 8 Characters"],
    select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

},{timestamps:true})

//Password Hashing 
userSchema.pre("save",async function(next){
    //1st updating profile(name,email,img)
    //2nd update password

    if(!this.isModified("password")){
        return ;
    }

    this.password=await bcryptjs.hash(this.password,10);
    // next();

    
})

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},
        process.env.JWT_SECRET_KEY,
        {
        expiresIn:process.env.JWT_EXPIRE
    })
}
userSchema.methods.verifyPassword = async function(userEnteredPassword){
    console.log(typeof userEnteredPassword);
console.log(typeof this.password);
    return await bcryptjs.compare(userEnteredPassword,this.password);
}

//generating token
userSchema.methods.generatePasswordResetToken=function(){
    const resetToken=crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken=crypto.createHash("sha256").update
    (resetToken).digest("hex");
    this.resetPasswordExpire=Date.now()+30*60*1000 //30min
    return resetToken;
}
export default mongoose.model("User",userSchema);