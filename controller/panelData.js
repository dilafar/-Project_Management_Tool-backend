let PanelDatamodel = require("../models/panelData");

const createPanel = async(req,res)=>{
    const {panel ,type}= req.body;
    
    const newPanel = new PanelDatamodel({
        panel ,type
    });
    try{
        const panel = await newPanel.save();
        res.status(201).json(panel);
    }catch(err){
        res.status(409).json(err);
    }
  
        
    
};


const updatePanel =  async(req,res)=>{
    const  id = req.params.id;
    const{ panel ,type}= req.body;
    const updatePanel = {
        panel ,type
    }
    await PanelDatamodel.findByIdAndUpdate(id, updatePanel).then(()=>{
        res.status(200).json(updatePanel);
    }).catch((err)=>{
        console.log(err);
        res.status(400).json(err);
    })

};

const deletePanel = async(req,res)=>{

const id = req.params.id;
await PanelDatamodel.findByIdAndDelete(id).then(()=>{
        res.status(200).json({msg:"Deletion successfull"});
}).catch((err)=>{
    console.log(err);
    res.status(400).json(err);
})

};

const getAllPanels = async(req , res) =>{
    try{
            const panels = await PanelDatamodel.find();

            res.status(200).json(panels);
    }catch(err){
            res.status(404).json({message : err.message});
    }
}

module.exports = {createPanel , updatePanel , deletePanel , getAllPanels};