const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const staffSchema=new mongoose.Schema({
    branch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Branch',
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        min:3
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
        enum:['staff','admin','superadmin'],
        default:'staff'
    },
    time:{
        type:Date,
        default: Date.now
    }
});

staffSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
});

staffSchema.methods.checkPassword=async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
};

module.exports=mongoose.model('Staff',staffSchema);