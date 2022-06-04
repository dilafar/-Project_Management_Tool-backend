let Response= require("../models/Response");
let model = require("../models/usermodel");



const createResponse = async(req,res)=>{
    const {StaffId , StudentId  , ID , Type , status, Message}= req.body;
    //const StaffId  = req.userId;
    const newResponse = new Response({
        StaffId,StudentId  , ID ,Type , status, Message
    });
    try{
        if(Type === 'Suppervisor'){
            const updatedUser = await model.findByIdAndUpdate(ID , {SupervisorStatus : "Approved",SupervisorId:StaffId},{new: true});
            const response = await newResponse.save();
            res.status(200).json({response , updatedUser});      
        }else if(Type === 'Co-Supervisor'){
            const updatedUser = await model.findByIdAndUpdate(ID , {CoSupervisorStatus : "Approved" , CoSupervisorId :StaffId},{new: true});
            const response = await newResponse.save();
            res.status(200).json({response , updatedUser}); 
        }
       
    }catch(err){
        res.status(409).json(err);
    }
  
        
    
};


const deleteResponse = async(req,res)=>{

    const id = req.params.id;
    await Response.findByIdAndDelete(id).then(()=>{
            res.status(200).json({msg:"Deletion successfull"});
    }).catch((err)=>{
        console.log(err);
        res.status(400).json(err);
    })

};

const getAllResponse= async(req , res) =>{
    try{
            const response = await Response.find();

            res.status(200).json(response);
    }catch(err){
            res.status(404).json({message : err.message});
    }
}

const getResponseByID = async(req , res) =>{
    try{
            const Id  = req.userId;
            const response = await Response.find({StudentId : Id});

            res.status(200).json(response);
    }catch(err){
            res.status(404).json({message : err.message});
    }
}

module.exports = {createResponse , deleteResponse , getAllResponse ,getResponseByID};