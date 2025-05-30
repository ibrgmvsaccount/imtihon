const CustomError=require('../utils/CustomError');

const errorHandler=(error,req,res,next)=>{
    console.error(error.message);
    
    if (error instanceof CustomError){
        return res.status(error.statusCode).json({
           success:false,
           message:error.message,
        });
    }

    if (error.name==='ValidationError') {
        const messages=Object.values(error.errors).map(val=>val.message);
        return res.status(400).json({
            success:false,
            message:messages.join(', ')
        });
    }

    if (error.name==='CastError') {
        return res.status(400).json({
            success:false,
            message:`Noto'g'ri ID formati: ${error.value}`
        });
    }

    res.status(500).json({
        success:false,
        message:'Serverda xatolik!',
        error:error.message
    });
};

module.exports=errorHandler;