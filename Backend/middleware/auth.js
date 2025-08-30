import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const userAuth = (req, res, next)=>{
    const token = req.headers.token;

    const decoded = jwt.verify(token, JWT_SECRET) 

    if(!decoded){
        res.status(404).json({
            message:"Not authorized"
        })
    }else{
        req.userId = decoded.id //The object id is going here that I put in while logging in
        next()
    }



}