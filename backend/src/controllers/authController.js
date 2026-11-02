import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import {makeToken,publicUser} from '../utils/token.js';
export async function register(req,res){
 const {name,email,password}=req.body;if(!name||!email||!password)return res.status(400).json({message:'Name, email and password are required'});
 if(password.length<6)return res.status(400).json({message:'Password must contain at least 6 characters'});
 if(await User.findOne({email}))return res.status(409).json({message:'An account with this email already exists'});
 const user=await User.create({name,email,password:await bcrypt.hash(password,10)});res.status(201).json({user:publicUser(user),token:makeToken(user._id)});
}
export async function login(req,res){const {email,password}=req.body;const user=await User.findOne({email});if(!user||!(await bcrypt.compare(password||'',user.password)))return res.status(401).json({message:'Invalid email or password'});res.json({user:publicUser(user),token:makeToken(user._id)});}
export async function profile(req,res){res.json({user:req.user});}
