import Order from '../models/Order.js';
import Product from '../models/Product.js';
export async function createOrder(req,res){
 const {items,shippingAddress}=req.body;if(!items?.length||!shippingAddress?.fullName||!shippingAddress?.address||!shippingAddress?.phone)return res.status(400).json({message:'Please complete your cart and shipping details'});
 let itemsPrice=0;const orderItems=[];
 for(const item of items){const product=await Product.findById(item.product);if(!product)return res.status(404).json({message:'A product in your cart is no longer available'});const qty=Math.max(1,Math.min(Number(item.qty)||1,product.countInStock));if(qty>product.countInStock||product.countInStock===0)return res.status(400).json({message:`${product.name} is out of stock`});itemsPrice+=product.price*qty;orderItems.push({product:product._id,name:product.name,image:product.image,price:product.price,qty});product.countInStock-=qty;await product.save();}
 const shippingPrice=itemsPrice>999?0:79;const taxPrice=Number((itemsPrice*.05).toFixed(2));const order=await Order.create({user:req.user._id,items:orderItems,shippingAddress,paymentMethod:'Cash on Delivery',itemsPrice,shippingPrice,taxPrice,totalPrice:itemsPrice+shippingPrice+taxPrice});res.status(201).json({order});
}
export async function myOrders(req,res){res.json({orders:await Order.find({user:req.user._id}).sort({createdAt:-1})});}
export async function allOrders(req,res){res.json({orders:await Order.find().populate('user','name email').sort({createdAt:-1})});}
export async function updateOrderStatus(req,res){const order=await Order.findById(req.params.id);if(!order)return res.status(404).json({message:'Order not found'});order.status=req.body.status;await order.save();res.json({order});}
