const mongoose=require('mongoose');

const branchSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    time:{
        type:Date,
        default:Date.now
    },
    address:{
        type:String,
        required:true,
        trim:true
    }
}, {timestamps:true});

module.exports=mongoose.model('Branch',branchSchema);