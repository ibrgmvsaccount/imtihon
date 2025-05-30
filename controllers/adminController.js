const Admin=require('../models/Admin');
const CustomError=require('../utils/CustomError');
const bcrypt=require('bcrypt');

exports.addAdmin=async (req,res,next) => {
    try {
        const {username,password,birthDate,gender,role}=req.body;
        const exists=await Admin.findOne({username});
        if (exists) throw new CustomError('Bu admin allaqachhon mavjud',400);
        const hashedPassword=await bcrypt.hash(password,10);
        const admin=await Admin.create({
            username,
            password:hashedPassword,
            birthDate,
            gender,
            role:role||'Admin',
        });
        res.status(201).json(admin)
    } catch (error) {
        next(error)
    }
};

exports.getAdmins=async (req,res,next) => {
    try {
        const admins=await Admin.find();
        res.json(admins);
    } catch (error) {
        next(error);
    }
};

exports.getAdminByID=async (req,res,next) => {
    try {
        const admin=await Admin.findById(req.params.id);
        if (!admin) throw new CustomError('Admin topilmadi',404);
        res.json({admin})    
    } catch (error) {
        next(error)
    }
};

exports.deleteAdmin=async (req,res,next) => {
    try {
        const removed=await Admin.findByIdAndDelete(req.params.id);
        if (!removed) throw new CustomError('Admin topilmadi', 404);
        res.json({message:"Admin o'chirildi"});
    } catch (error) {
        next(error)
    }
};