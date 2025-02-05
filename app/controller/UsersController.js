import UsersModel from "../model/UsersModel.js";
import { TokenEncode } from "../utility/tokenUtility.js";

export const Registration=async(req,res)=>{
     
     try {
        let reqBody=req.body;
       let result = await UsersModel.create(reqBody) ;
        return res.status(200).json({status:"success","Message":"Registration",result})
     } catch (error) {
        console.log(error)
        return res.status(200).json({status:"error","Message":"Internal Server error", error})
     }
   
}

export const Login=async(req,res)=>{

     try {
        let reqBody= req.body;
        let data=await UsersModel.findOne(reqBody);
         console.log(data);
         if(data=== null){
            return res.status(200).json({status:"Failed ","Message":"User not Found"})
         }
         let token= TokenEncode(data['email'],data['_id'])
         
        return res.status(200).json({status:"success","Message":"Login",Token:token})
     } catch (error) {
        console.log(error)
        return res.status(200).json({status:"error","Message":"Internal Server error", error})   
     }
   
}


export const ProfileDetails=async(req,res)=>{
  
    try {
        
        let user_id=req.headers.user_id;
        let data= await UsersModel.findOne({"_id":user_id},{"_id":0})
        return res.status(200).json({status:"success","Message":"Login",Data:data})
    } catch (error) {
      
        return res.status(200).json({status:"error","Message":"Internal Server error", error})  
    }    
}
export const ProfileUpdate=async(req,res)=>{
try {
    let reqBody= req.body;
    let user_id=req.headers.user_id;
    reqBody.user_id=user_id;
    console.log(reqBody);

    let result= await UsersModel.updateOne({"_id":user_id},reqBody);
    return res.status(200).json({status:"successfully updated",result:result})
} catch (error) {
   
    return res.status(500).json({status:"error","Message":"Internal Server error", error})
    
}
}

export const EmailVerify=async(req,res)=>{
    return res.status(200).json({status:"success","Message":"EmailVerify"})
}

export const CodeVerify=async(req,res)=>{
    return res.status(200).json({status:"success","Message":"CodeVerify"})
}

export const ResetPassword=async(req,res)=>{
    return res.status(200).json({status:"success","Message":"ResetPassword"})
}