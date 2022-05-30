let Request = require("../models/Request");



const createRequest = async(req,res)=>{
    const {StaffId ,Type ,topic , discription,technology}= req.body;
    const StudentId = req.userId;
    const  ID = req.Id;
    const newRequest = new Request({
        StudentId ,StaffId , ID , Type ,topic , discription,technology
    });
    try{
        const request = await newRequest.save();
        res.status(201).json(request);
    }catch(err){
        res.status(409).json(err);
    }
  
        
    
};


const deleteRequest = async(req,res)=>{

    const id = req.params.id;
    await Request.findByIdAndDelete(id).then(()=>{
            res.status(200).json({msg:"Deletion successfull"});
    }).catch((err)=>{
        console.log(err);
        res.status(400).json(err);
    })

};
/*
const getAllRequest= async(req , res) =>{
    try{
            const requests = await Request.find();

            res.status(200).json(requests);
    }catch(err){
            res.status(404).json({message : err.message});
    }
}

*/
const getRequestByID = async(req , res) =>{
    try{
            const Id  = req.Id;
            const request = await Request.find({StaffId : Id });

            res.status(200).json(request);
    }catch(err){
            res.status(404).json({message : err.message});
    }
}

module.exports = {createRequest , deleteRequest , getRequestByID };