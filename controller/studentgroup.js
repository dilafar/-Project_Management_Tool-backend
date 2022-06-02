const group = require('../models/studentgroup');

const getAllProduct = async(req,res)=>{
    const {page} = req.query;
    try{
        const Limit = 6;
        const startIndex = (Number(page - 1)) * Limit;
        const total = await Product.countDocuments({});
        const product = await Product.find().sort({_id: -1}).limit(Limit).skip(startIndex);
        res.status(200).json({data: product, currentPage: Number(page), numberOfPages: Math.ceil(total/Limit)});
        
    }catch(err){
        res.status(404).json(err);
        console.log(err);
    }
    
   
};

const createGroup = async(req,res)=>{
    const {leader , student1 , student2 , student3 , Supervisor , CoSupervisor}= req.body;
    const userId  = req.Id;
    const newgroup = new group({
        leader , student1 , student2 , student3 , Supervisor , CoSupervisor, userId 
    });
    try{
        const group2 = await newgroup.save();
        res.status(201).json(group2);
    }catch(err){
        res.status(409).json(err);
    }
  
        
    
};

const updateGroup =  async(req,res)=>{
        const  userid = req.params.id;
        const{ leader , student1 , student2 , student3 , Supervisor , CoSupervisor}= req.body;
        const updateGroup = {
            leader , student1 , student2 , student3 , Supervisor , CoSupervisor
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






module.exports = {getAllProduct , createProduct ,updateProduct ,deleteProduct ,getProductById};