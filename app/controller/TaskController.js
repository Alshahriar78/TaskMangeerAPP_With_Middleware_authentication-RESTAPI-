import TasksModel from "../model/TasksModel.js";
import mongoose from "mongoose";

export const CreateTask=async(req,res)=>{
   try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.user_id = user_id;
       let data = await TasksModel.create(reqBody);
        return res.status(200).json({
            status: "success",
            message: "Task created successfully",
            data,
          });
     
   } catch(err){
    return res.status(500).json({
        status:"Error",
        Message:"Internal Server Error"
    })
   }
}

export const UpdateTaskStatus=async(req,res)=>{
   try {
     let id_task = req.params.id;
     let status = req.params.status;
     let user_id = req.headers.user_id;
      await TasksModel.updateOne({_id:id_task, user_id:user_id},{status:status});
     res.status(200).json({Message:"Task updated successfully",status:"success"});
   } catch (error) {
    return res.status(200).json({ 
        status: "Error", 
        Message: "Not Update" })
    
   }
}

export const TaskListByStatus=async(req,res)=>{
    try{
        let status = req.params.status;
        let user_id = req.headers.user_id;
        console.log(status)
        console.log(user_id);
        let data= await TasksModel.find({user_id: user_id, status: status},
            {_id:0,title:1,description:1,status:1})

        return res.status(200).json({"Message":"TaskListByStatus",Data:data});
    }catch (e) {
        console.log(e);
       res.status(200).json({status:"Error",Message:"Internal Server Error",});
    }

}

export const DeleteTask=async(req,res)=>{
   try{
       let id=req.params.id;
       await TasksModel.deleteOne({_id:id})
       res.status(200).json({Message:"Task deleted successfully",status:"success"});
   }catch (e) {
       return res.status(500).json({})
   }

}

export const CountTask=async(req,res)=>{
    try{
        let ObjectID = mongoose.Types.ObjectId;
        let user_id = req.headers.user_id;
        let user_ObjectID = new ObjectID(user_id);

        let data = await TasksModel.aggregate([
            {$match: {user_id:user_ObjectID}},
            {$group:{_id:"$status", sum:{$count:{}}}}
        ])
         console.log(typeof data)
        return res.status(200).json({status:"success","Message":"CountTask",data:data});
    }catch (e) {

    }
    return res.status(200).json({status:"success","Message":"CountTask"})

}