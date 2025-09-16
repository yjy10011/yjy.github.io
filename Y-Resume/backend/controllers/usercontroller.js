import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userID) => { //Token 生成 从环境变量中读取密钥
    return jwt.sign({id: userID}, process.env.JWT_SECRET, {expiresIn: '7d'})

}
//用户注册部分
export const registerUser = async (req, res) =>{
    try{
        const {name, email, password} = req.body; //从请求体中获取用户输入的数据

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: 'User already exists'});
        }
        if(password.length < 8){
            return res.status(400).json({sucess:false, message: 'Password must be at least 8 characters'});
        }

        //对密码进行加盐哈希处理
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({//创建用户并存入数据库
            name,
            email,
            password: hashedPassword,
        })
        res.status(201).json({//201是创建成功的状态码
            _id: user._id,  
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }

    catch(error){
        res.status(500).json({
            message: "server error",
            error: error.message
        })
    }
}

//用户登录
export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});//根据邮箱查找用户
        if(!user){                      
            return res.status(500).json({message: 'invalid email or password'});
        } 
        //比对密码
        const isMatch = await bcrypt.compare(password, user.password);                                                                            
        if(!isMatch){
            return res.status(500).json({message: 'invalid email or password'});
        }
        res.status(201).json({//返回用户
        _id: user._id,  
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
        })
    }
    catch(error){
        res.status(500).json({
            message: "server error",
            error: error.message
        })
    }
}

//获取用户资料
export const getUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select('-password'); //查找用户，返回结果排除password
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    }
    catch(error){
        res.status(500).json({
            message: "server error",
            error: error.message
        })
    }
}