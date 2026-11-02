import jwt from 'jsonwebtoken';
export const makeToken=(id)=>jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'7d'});
export const publicUser=(user)=>({_id:user._id,name:user.name,email:user.email,isAdmin:user.isAdmin});
