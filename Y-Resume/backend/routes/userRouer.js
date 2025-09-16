import express from "express";
import { registerUser,loginUser, getUserProfile } from "../controllers/usercontroller.js";
import { protect } from "../middleware/authMiddleware.js";

const  userRouter = express.Router();

userRouter.post('/register',registerUser)

userRouter.post('/login',loginUser)

//
userRouter.get('/profile',protect, getUserProfile)


export default userRouter;
