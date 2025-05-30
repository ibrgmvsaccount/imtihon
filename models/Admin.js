const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const adminSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        min:0
    },
    birthdate:{
        type:Date,
        required:true,
    },
    gender:{
        type:String,
        enum:['male','female'],
        required:true,
    },
    role:{
        type:String,
        ennum:['admin','superadmin'],
        default:'admin'
    },
    time:{
        type:Date,
        default: Date.now
    }
});

adminSchema.pre('save',async function (next) {
    if (!this.isModified('password')) return next();
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
});

adminSchema.methods.checkPassword=async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
};

module.exports=mongoose.model('Admin',adminSchema);