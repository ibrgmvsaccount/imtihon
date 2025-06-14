const mongodb=require('mongoose');

const connectDB=async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("MongoDB is connected!");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports=connectDB;