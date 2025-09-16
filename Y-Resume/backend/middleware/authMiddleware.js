import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
    try{
        let token = req.headers.authorization;//从http请求的的authorization头中获取token（令牌）

        if(token && token.startsWith('Bearer')){//格式验证
            token = token.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);//用密钥验证token的有效性
            req.user = await User.findById(decoded.id).select('-password');//从解码的令牌中获取用户ID，并查询数据库获取用户信息，排除密码字段
            next();
        }
        else{
            res.status(401).json({message: 'Not authorized, no token'})
        }
    }
    catch(error){
        res.status(401).json({
            message: 'Token is not valid',
            error: error.message
        })
    }
}