import {Router} from 'express';
import { register,login,logout } from '../controllers/user.controller.js';
import protect from '../middlewares/auth.middleware.js';
const userRouter = Router();


userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.get('/logout',logout)
// userRouter.get('/profile',getProfile)

export default userRouter;