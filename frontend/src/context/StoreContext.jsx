import {createContext,useContext,useEffect,useMemo,useState} from 'react';import api from '../api';
const StoreContext=createContext(null);
export function StoreProvider({children}){
 const [user,setUser]=useState(()=>JSON.parse(localStorage.getItem('shopsphere_user')||'null'));
 const [cart,setCart]=useState(()=>JSON.parse(localStorage.getItem('shopsphere_cart')||'[]'));
 const [wishlist,setWishlist]=useState(()=>JSON.parse(localStorage.getItem('shopsphere_wishlist')||'[]'));
 useEffect(()=>localStorage.setItem('shopsphere_cart',JSON.stringify(cart)),[cart]);useEffect(()=>localStorage.setItem('shopsphere_wishlist',JSON.stringify(wishlist)),[wishlist]);
 const saveSession=data=>{localStorage.setItem('shopsphere_token',data.token);localStorage.setItem('shopsphere_user',JSON.stringify(data.user));setUser(data.user);};
 const login=async credentials=>saveSession((await api.post('/auth/login',credentials)).data);
 const register=async details=>saveSession((await api.post('/auth/register',details)).data);
 const logout=()=>{localStorage.removeItem('shopsphere_token');localStorage.removeItem('shopsphere_user');setUser(null);};
 const addToCart=(product,qty=1)=>setCart(old=>{const found=old.find(x=>x._id===product._id);return found?old.map(x=>x._id===product._id?{...x,qty:Math.min(x.qty+qty,product.countInStock)}:x):[...old,{...product,qty:Math.min(qty,product.countInStock)}]});
 const updateQty=(id,qty)=>setCart(old=>old.map(x=>x._id===id?{...x,qty:Math.max(1,Math.min(Number(qty)||1,x.countInStock))}:x));
 const removeFromCart=id=>setCart(old=>old.filter(x=>x._id!==id));
 const toggleWishlist=p=>setWishlist(old=>old.some(x=>x._id===p._id)?old.filter(x=>x._id!==p._id):[...old,p]);
 const value=useMemo(()=>({user,cart,wishlist,login,register,logout,addToCart,updateQty,removeFromCart,toggleWishlist,setCart}),[user,cart,wishlist]);
 return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
export const useStore=()=>useContext(StoreContext);
