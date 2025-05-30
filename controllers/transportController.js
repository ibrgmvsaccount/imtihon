const Transport=require('../models/Transport');
const CustomError=require('../utils/Customerror');

exports.getTransports=async (req,res,next) => {
    try {
        const {branch,search}=req.query;
        let filter={};
        if (branch) filter.branch=branch;
        if (search) filter.model={$regex:search,$options:'i'};
        const transports=await Transport.find(filter).populate('branch');
        res.status(200).json(transports);
    } catch (error) {
        next(error);
    }
};

exports.addTransport=async (req,res,next) => {
    try {
        const {branch,model,color,img,price,time}=req.body;
        const newTransport=await Transport.create({branch,model,color,img,price,time});
        res.status(201).json(newTransport);
    } catch (error) {
        next(error);
    }
};

exports.updateTransport=async (req,res,next) => {
    try {
        const updated=await Transport.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        if (!updated) throw new CustomError('Transport topilmadi',404);
        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
};

exports.deleteTransport=async (req,res,next) => {
    try {
        const removed=await Transport.findByIdAndDelete(req.params.id);
        if (!removed) throw new CustomError('Transport topilmadi',404);
        res.status(200).json({message:"Transport o'chirildi"})
    } catch (error) {
        next(error)
    }
};