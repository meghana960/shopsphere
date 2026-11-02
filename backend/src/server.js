import 'dotenv/config';import express from 'express';import cors from 'cors';import connectDB from './config/db.js';import authRoutes from './routes/authRoutes.js';import productRoutes from './routes/productRoutes.js';import orderRoutes from './routes/orderRoutes.js';
const app=express();app.use(cors({origin:process.env.CLIENT_URL||'http://localhost:5173'}));app.use(express.json());
app.get('/api/health',(req,res)=>res.json({status:'ok',service:'ShopSphere API'}));app.use('/api/auth',authRoutes);app.use('/api/products',productRoutes);app.use('/api/orders',orderRoutes);
app.use((err,req,res,next)=>{console.error(err);res.status(500).json({message:err.message||'Server error'});});
const PORT=process.env.PORT||5000;connectDB().then(()=>app.listen(PORT,()=>console.log(`API running on ${PORT}`)));
