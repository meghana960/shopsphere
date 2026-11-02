import Product from '../models/Product.js';
export async function listProducts(req,res){
 const {keyword,category,sort}=req.query;const filter={};if(keyword)filter.$or=[{name:{$regex:keyword,$options:'i'}},{brand:{$regex:keyword,$options:'i'}},{description:{$regex:keyword,$options:'i'}}];if(category&&category!=='All')filter.category=category;
 let query=Product.find(filter);if(sort==='price-asc')query=query.sort({price:1});else if(sort==='price-desc')query=query.sort({price:-1});else if(sort==='rating')query=query.sort({rating:-1});else query=query.sort({createdAt:-1});
 const products=await query;res.json({products});
}
export async function getProduct(req,res){const product=await Product.findById(req.params.id);if(!product)return res.status(404).json({message:'Product not found'});res.json({product});}
export async function createProduct(req,res){const product=await Product.create(req.body);res.status(201).json({product});}
export async function deleteProduct(req,res){const product=await Product.findByIdAndDelete(req.params.id);if(!product)return res.status(404).json({message:'Product not found'});res.json({message:'Product deleted'});}
