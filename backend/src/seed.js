import 'dotenv/config';import connectDB from './config/db.js';import User from './models/User.js';import Product from './models/Product.js';import bcrypt from 'bcryptjs';
const products=[
['Noise Air Buds Pro','Wireless earbuds with active noise cancellation, clear calls and long battery life.','Electronics',2499,28,'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=900',4.4],
['Smart Fitness Watch','Track workouts, heart rate, sleep and everyday activity with a bright display.','Electronics',3299,20,'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900',4.2],
['Everyday Backpack','Water-resistant backpack with padded laptop sleeve and practical storage.','Fashion',1499,35,'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900',4.5],
['Classic Analog Watch','Minimal stainless-steel watch designed for everyday wear.','Fashion',2199,16,'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=900',4.1],
['Ceramic Coffee Mug Set','Set of two modern ceramic mugs for coffee, tea and gifting.','Home',699,50,'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900',4.6],
['Desk Lamp','Adjustable LED desk lamp for focused work and comfortable reading.','Home',1199,24,'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900',4.3],
['Running Shoes','Lightweight everyday running shoes with cushioned support.','Sports',2799,18,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900',4.4],
['Yoga Mat','Non-slip exercise mat for yoga, stretching and home workouts.','Sports',899,42,'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=900',4.5],
['The Creative Mind','An inspiring read about creativity, habits and finding better ideas.','Books',499,60,'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=900',4.7],
['Everyday Skincare Kit','A simple daily skincare essentials kit for a fresh routine.','Beauty',1299,22,'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=900',4.0],
['Portable Bluetooth Speaker','Compact wireless speaker with rich sound for home and travel.','Electronics',1899,19,'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=900',4.3],
['Indoor Plant Pot','Contemporary planter to bring a little greenery into your space.','Home',549,31,'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=900',4.6]
];
await connectDB();await Product.deleteMany();await Product.insertMany(products.map(([name,description,category,price,countInStock,image,rating])=>({name,description,category,price,countInStock,image,rating,numReviews:Math.floor(rating*17),featured:rating>4.4})));
let admin=await User.findOne({email:'admin@shopsphere.demo'});if(!admin)await User.create({name:'ShopSphere Admin',email:'admin@shopsphere.demo',password:await bcrypt.hash('Admin123!',10),isAdmin:true});console.log('Seed complete: products added and demo admin ensured.');process.exit();
