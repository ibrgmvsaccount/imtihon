const mongoose=require('mongoose');

const permissionSchema=new mongoose.Schema({
    staff:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Staff',
        required:true,
    },
    model:{
        type:String,
        required:true,
        enum:['transport','branch','staff','permission']
    },
    actions:[
    {
        type:String,
        enum:['create','read','update','delete'],
        required:true,
    }
],
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('Permission',permissionSchema);