import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import {register,login,profile} from '../controllers/authController.js';
import {protect} from '../middleware/auth.js';
const router=Router();
router.post('/register',asyncHandler(register));
router.post('/login',asyncHandler(login));
router.get('/profile',protect,asyncHandler(profile));
export default router;
