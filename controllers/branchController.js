const Branch=require("../models/Branch");
const CustomError=require("../utils/CustomError");

exports.getBranches=async (req,res,next) => {
    try {
        const branches=await Branch.find();
        res.status(200).json(branches);
    } catch (error) {
        next(error);
    }
};

exports.addBranch=async (req,res,next) => {
    try {
        const {name,address,time}=req.body;
        const exists=await Branch.findOne({name});
        if (exists) throw new CustomError('Bunday nomdagi filial allaqachon mavjud', 400);
        const branch=await Branch.create({name, address, time});
        res.status(201).json(branch);
    } catch (error) {
        next(error)
    }
};

exports.getBranchById=async (req,res,next) => {
    try {
        const branch=await Branch.findById(req.params.id);
        if (!branch) throw new CustomError('Filial topilmadi',404);
        res.json(branch);
    } catch (error) {
        next(error)
    }
};

exports.updateBranch=async (req,res,next) => {
    try {
        const updated=await Branch.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
        });
        if (!updated) throw new CustomError('Filial topilmadi',404);
        res.json(updated);
    } catch (error) {
        next(error);
    }
};

exports.deleteBranch=async (req,res,next) => {
    try {
        const removed=await Branch.findByIdAndDelete(req.params.id);
        if (!removed) throw new CustomError('Filial topilmadi',404);
        res.json({message:"Filial o'chirildi"});
    } catch (error) {
        next(error)
    }
}