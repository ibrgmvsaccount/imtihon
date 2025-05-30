const mongoose=require('mongoose');

const transportSchema=new mongoose.Schema({
    branch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Branch',
        required:true,
    },
    model:{
        type:String,
        required:true,
        trim:true
    },
    color:{
        type:String,
        required:true,
        trim:true
    },
    img:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    time:{
        type:Date,
        default: Date.now
    }
}, {timestamps:true});

module.exports=mongoose.model('Transport',transportSchema);