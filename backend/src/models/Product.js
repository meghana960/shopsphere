import mongoose from 'mongoose';
const productSchema=new mongoose.Schema({name:{type:String,required:true,trim:true},description:{type:String,required:true},brand:{type:String,default:'ShopSphere'},category:{type:String,required:true},image:{type:String,required:true},price:{type:Number,required:true,min:0},countInStock:{type:Number,default:0,min:0},rating:{type:Number,default:0},numReviews:{type:Number,default:0},featured:{type:Boolean,default:false}},{timestamps:true});
export default mongoose.model('Product',productSchema);
