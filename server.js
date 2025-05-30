const express=require('express');
constapp=express();
constcors=require('cors');
consthelmet=require('helmet');
constmorgan=require('morgan');
constdotenv=require('dotenv');
constlogger=require('./utils/logger');
consterrorHandler=require('./middlewares/errorHandler');
const{connectDB}=require('./config/db');

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

connectDB();

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/branch', require('./routes/branchRoutes'));
app.use('/api/staff', require('./routes/staffRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/transport', require('./routes/transportRoutes'));
app.use('/api/permission', require('./routes/permissionRoutes'));

app.use(errorHandler);
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
 logger.info(`🚀 Server ishlayapti: http://localhost:${PORT}`);
});
