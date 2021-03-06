const group = require('../models/studentgroup');
const model = require('../models/usermodel');


const getAllGroups= async(req , res) =>{
    try{
            const groups = await group.find();

            res.status(200).json(groups);
    }catch(err){
            res.status(404).json({message : err.message});
    }
}

const createGroup = async(req,res)=>{
    const {leader,leaderid,student1,student1id , student2, student2id , student3, student3id , Supervisor , CoSupervisor}= req.body;
    const userId  = req.Id;
    const newgroup = new group({
        leader,leaderid,student1,student1id , student2, student2id , student3, student3id, Supervisor , CoSupervisor, userId 
    });
    try{
        const group2 = await newgroup.save();
        if(group2){
                await model.findByIdAndUpdate(userId , {Group : "created"} , {new: true});
        }
        res.status(201).json(group2);
    }catch(err){
        res.status(409).json(err);
    }
  
        
    
};

const updateGroup =  async(req,res)=>{
        const  userid = req.params.id;
        const{Date,startTime,endTime,panel}= req.body;
        const updateGroup = {
            Date,startTime,endTime,panel
        }
        await group.findByIdAndUpdate(userid,updateGroup).then(()=>{
            res.status(200).json(updateGroup);
        }).catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })

};


const deleteGroup = async(req,res)=>{

    const id = req.params.id;
    await group.findByIdAndDelete(id).then(()=>{
            res.status(200).json({msg:"Deletion successfull"});
    }).catch((err)=>{
        console.log(err);
        res.status(400).json(err);
    })

};

const getGroupById = async(req , res) =>{
    try{
            const Id  = req.Id;
            const groups = await group.find({userId : Id });

            res.status(200).json(groups);
    }catch(err){
            res.status(404).json({message : err.message});
    }
}

const getGroupBySupervisor = async(req , res) =>{
    try{
            const Id  = req.Id;
            const groups = await group.find({Supervisor : Id });

            res.status(200).json(groups);
    }catch(err){
            res.status(404).json({message : err.message});
    }
}

const getGroupByCoSupervisor = async(req , res) =>{
    try{
            const Id  = req.Id;
            const groups = await group.find({CoSupervisor : Id });

            res.status(200).json(groups);
    }catch(err){
            res.status(404).json({message : err.message});
    }
}







module.exports = {getAllGroups , createGroup  , updateGroup , getGroupByCoSupervisor , getGroupBySupervisor , getGroupById , deleteGroup};