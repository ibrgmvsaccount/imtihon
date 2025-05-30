const Permission=require('../models/Permission');
const CustomError=require('../utils/CustomError');

exports.getAllPermissions=async (req,res,next) => {
    try {
        const permissions=await Permission.find().populate('staff');
        res.json(permissions);
    } catch (error) {
        next(error);
    }
};

exports.getOwnPermissions=async (req,res,next) => {
    try {
        const userId=req.user.id;
        const permissions=await Permission.find({staff:userId});
        res.json(permissions);
    } catch (error) {
        next(error)
    }
};

exports.addPermission=async (req,res,next) => {
    try {
        const {staff, permissionModel, permission}=req.body;
        const exists=await Permission.findOne({staff,permissionModel});
        if (exists) throw new CustomError('Bu foydalanuvchida bu model uchun ruxsat mavjud',400);
        const newPermission=await Permission.create({staff, permissionModel,permission});
        res.status(201).json(newPermission);
    } catch (error) {
        next(error);
    }
};

exports.changePermission=async (req,res,next) => {
    try {
        const {id}=req.params;
        const {permission}=req.body;
        const updated=await Permission.findByIdAndUpdate(
            id,
            {permission},
            {new:true,runValidators:true}
        );
        if (!updated) throw new CustomError('Ruxsat topilmadi',404);
        res.json(updated)
    } catch (error) {
        next(error)
    }
};

exports.deletePermission=async (req,res,next) => {
    try {
        const {id}=req.params;
        const removed=await Permission.findByIdAndDelete(id);
        if (!removed) throw new CustomError('Ruxsat topilmadi',404);
        res.json({message:"Ruxsat o'chirildi"})
    } catch (error) {
        next(error)
    }
};