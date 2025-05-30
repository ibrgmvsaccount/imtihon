const Staff=require('../models/Staff');
const CustomError=require('../utils/CustomError');
const bcrypt = require('bcrypt');

exports.getStaffs=async (req,res,next) => {
    try {
        const staffs=await Staff.find().populate('branch');
        res.json(staffs);
    } catch (error) {
        next(error)
    }
};

exports.addStaff=async (req,res,next) => {
    try {
        const {username,password, birtdate,gende,rbranch}=req.body;
        const exists=await Staff.findOne({username});
        if (exists) throw new CustomError('Bu foydalanuvchi nomi allaqachon mavjud',400);
        const hashedPassword=await bcrypt.hash(password,10);
        const staff=await Staff.create({
            username,
            password:hashedPassword,
            birtdate,
            gender,
            branch,
        });
        res.status(201).json(staff);
    } catch (error) {
        next(error)
    }
};

exports.getStaffById=async (req,res,next) => {
    try {
        const staff=await Staff.findById(req.params.Id)/populate('branch');
        if (!staff) throw new CustomError('Hodim topilmadi',404);
        res.json(staff);
    } catch (error) {
        next(error)
    }
}

exports.updateStaff=async (req,res,next) => {
    try {
        const updates=req.body;
        if (updates.password) {
            updates.password=await bcrypt.hash(updates.password,10)
        }

    const updated=await Staff.findByIdAndUpdate(req.params.id,updates,{
        new:true,
        runValidators:true
    });
    if (!updated) throw new CustomError("Xodim topilmadi",404)
        res.json(updated);
    } catch (error) {
        next(error)
    }
};

exports.deleteStaff=async (req,res,next) => {
    try {
        const removed=await Staff.findByIdAndDelete(req.params.id);
        if (!removed) throw new CustomError('Xodim topilmadi')
            res.json({mrssage:"Xodim o'chirildi"})
    } catch (error) {
        next(error)
    }
};