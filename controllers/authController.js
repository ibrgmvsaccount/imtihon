const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const Staff=require('../models/Staff');

exports.register=async (req,res)=>{
    const { username, branch, password, repeatPassword, birthDate, gender, role }=req.body;
    if (password!==repeatPassword) return res.status(400).json({message:'Prol mos emas!'});
    const hashed=await bcrypt.hash(password,10);
    const staff=await Staff.create({username,branch,password:hashed,birthDate,gender,role});
    const token=jwt.sign({id:staff._id, role:staff.role}, process.env.JWT_SECRET);
    res.json({token});
};

exports.login=async (req,res) => {
    const {username, password}=req.body;
    const user=await Staff.findOne({username});
    if (!user) return res.status(404).json({message:'Foydalanuvchi topilmadi'});

    const match=await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({message:"Noto'g'ri parol"});

    const token=jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET);
    res.json({token});
};