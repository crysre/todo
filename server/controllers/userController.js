import {z} from "zod";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/user.js";

dotenv.config();
const jwt_secret = process.env.JWT_SECRET;

export const handleSignup =  async (req, res)=>{

    const requiredBody = z.object({
        email: z.string().min(3).max(50),
        firstName: z.string().min(1).max(100),
        lastName: z.string().min(2).max(50),
        password: z.string().min(6).max(50)

    })

    const parsedData = requiredBody.safeParse(req.body)

    if(!parsedData.success){
        res.status(404).json({
            message:"Invalid credentials"
        })
    }

    const {email, password, firstName, lastName} = parsedData.data;




    const hashedPassword = await bcrypt.hash(password, 5)


    

    try{
        await UserModel.create({
        email,
        password: hashedPassword,
        firstName,
        lastName
    })

    res.status(200).json({
        message:"Signed up"
    })
    }catch(e){
        res.status(404).json({
            message:"Error while signing up"
        })
    }

}

export const handleLogin = async (req, res)=>{

        const requiredBody = z.object({
        email: z.email().min(3).max(50),
        password: z.string().min(6).max(50)

    })

    const parsedData = requiredBody.safeParse(req.body)

    if(!parsedData.success){
        res.status(404).json({
            message:"Invalid credentials"
        })
    }

    const {email, password} = parsedData.data;



    try{
        const user = await UserModel.findOne({
        email
    })

    let passwordCheck = await bcrypt.compare(password, user.password)
    
    console.log(user._id);
    


    if(passwordCheck){
        const token = jwt.sign({id:user._id}, jwt_secret)

        res.json({
            token
        })

        console.log(token);
        
    }else{
        res.json({
            message:"Wrong password"
        })
    }
    }catch(e){
        res.status(404).json({
            message:"User doesn't exist"
        })
    }

    

}
