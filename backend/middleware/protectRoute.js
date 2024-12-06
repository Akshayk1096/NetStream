
import { ENV_VARS } from '../config/envVars.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const protectRoute = async (req, res, next ) => {
    try{
        const token = req.cookies["jwt-netstream"]

        if(!token){
           return res.status(401).json({success: false, message:"No token, unauthorized request"})
        }
        
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET)

        if (!decoded){
            return res.status(401).json({success: false, message:"Invalid token, unauthorized request"})
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user){
            return res.status(401).json({success: false, message:"User not found"})
        }
        req.user = user;

        next();

    } catch (error){
        console.log('Error in protectRoute middleware:', error.message)
        res.status(500).json({success: false, message:"Internal server error"})
    }
}
