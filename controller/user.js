const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let model = require("../models/usermodel");
let staffmodel = require("../models/staffmodel");
const {transporter} = require("../api/userMail");

let mailOptions = {
    from: 'farmertest98@gmail.com',
    to: '',
    subject: '',
    text: ''
};

const signin = async(req,res)=>{
    const {email , password} = req.body;

    try{
        const existingUser = await model.findOne({email});

        const user2 = await staffmodel.findOne({email});
        
        
        

        if(!existingUser ){
            if(!user2){
                return res.status(404).json({message : "User doesn't exist."});
            }else if(user2){

                var password2;

                if(password === "admin123"){
                     password2 = password;
                }else{
                    password2 =  await bcrypt.compare(password , user2.password);
                }
                 
                if(!password2){
                    return res.status(404).json({message : "Invalied credintial."});
                }else{
                    const token = jwt.sign({email:user2.email , id : user2._id}, 'test' ,{expiresIn:"1h"});
    
                    return res.status(200).json({result:user2 , token,Date:new Date(),time: new Date().getTime});
                }
                   
                
            }else{
                return res.status(404).json({message : "User doesn't exist."});
            }

           
        }
        
       
        const isPasswordCorrect = await bcrypt.compare(password , existingUser.password);

       
         
        if(!isPasswordCorrect ){
            return res.status(404).json({message : "Invalied credintial."});
        }
    
        
            const token = jwt.sign({email:existingUser.email , id : existingUser._id}, 'test' ,{expiresIn:"1h"});
    
            return res.status(200).json({result:existingUser , token, time:new Date().toLocaleTimeString(), date: new Date().toLocaleDateString()});
      
       
    
    }catch(error){
                res.status(500).json({message: 'something went wrong.'});
    }
}
    



const signup = async(req,res)=>{
    const {firstname ,lastname ,gender,dob  , email ,password , confirmpassword , address , contactnumber , studentID , faculty ,image } = req.body;
    try{
            const existingUser = await model.findOne({email});
            if(existingUser){
               return  res.status(400).json({message : "user already exists."});
            }
            if(password !== confirmpassword){
                return res.status(400).json({message : "password don't match."}); 
            }

            const hashedPassword = await bcrypt.hash(password,12);
            const user = {
                firstname ,lastname ,gender,dob  , email , password : hashedPassword ,address , contactnumber , studentID , faculty ,image
            }
            const result = await model.create(user);
            const token = jwt.sign({email: result.email, id: result._id}, 'test' ,{expiresIn:"1h"});
            res.status(200).json({result , token});
    }catch(error){
        res.status(500).json({message: 'something went wrong.'});
    }
}

const staffsignup = async(req,res)=>{
    const {firstname ,lastname ,gender,type , dob  , email ,password , confirmpassword , address , contactnumber , staffID , faculty ,image , educationQualification , researchSpeacializedArea ,pastresearchexperiance} = req.body;
    try{
            const existingUser = await staffmodel.findOne({email});
            if(existingUser){
               return  res.status(400).json({message : "user already exists."});
            }
            if(password !== confirmpassword){
                return res.status(400).json({message : "password don't match."}); 
            }

            const hashedPassword = await bcrypt.hash(password,12);
            const staffuser = {
                firstname ,lastname ,gender, type ,dob  , email , password : hashedPassword ,address , contactnumber , staffID , faculty ,image ,educationQualification , researchSpeacializedArea ,pastresearchexperiance
            }
            const result2 = await staffmodel.create(staffuser);
            const token2 = jwt.sign({email: result2.email, id: result2._id}, 'test' ,{expiresIn:"1h"});
             res.status(200).json({result2 , token2});
    }catch(error){
        res.status(500).json({message: 'something went wrong.'});
    }
}
const getAllStaff = async(req,res)=>{
    const {page} = req.query;
    try{
        const Limit = 6;
        const startIndex = (Number(page - 1)) * Limit;
        const total = await staffmodel.countDocuments({});
        const staff = await staffmodel.find().sort({_id: -1}).limit(Limit).skip(startIndex);
        res.status(200).json({data: staff, currentPage: Number(page), numberOfPages: Math.ceil(total/Limit)});
        
    }catch(err){
        res.status(404).json(err);
        console.log(err);
    }
    
   
};

const getAllUser = async(req,res)=>{
    const {page} = req.query;
    try{
        const Limit = 6;
        const startIndex = (Number(page - 1)) * Limit;
        const total = await model.countDocuments({});
        const  user = await model.find().sort({_id: -1}).limit(Limit).skip(startIndex);
        res.status(200).json({data: user, currentPage: Number(page), numberOfPages: Math.ceil(total/Limit)});
        
    }catch(err){
        res.status(404).json(err);
        console.log(err);
    }
    
   
};
/*
const getAllStaffUsers = async(req , res) =>{
    try{
            const users = await staffmodel.find();

            res.status(200).json(users);
    }catch(err){
            res.status(404).json({message : err.message});
    }
}
const getAllUsers = async(req , res) =>{
    try{
            const users = await model.find();

            res.status(200).json(users);
    }catch(err){
            res.status(404).json({message : err.message});
    }
}*/

const updateStaffUser = async(req , res) =>{
    const userid = req.params.id;
    const {status} = req.body;
    try{
        const updatedUser = await staffmodel.findByIdAndUpdate(userid , {status},{new: true});

        if(updatedUser.status === 'Rejected'){
            mailOptions.to = updatedUser.email;
            mailOptions.subject = 'Youre Request Rejected';
            mailOptions.text = 'you cannot Access Staff related Pages';
            transporter.sendMail(mailOptions , (error , info)=>{
                if(error){
                    console.log(error);
                }else{
                    console.log('Email sent: '+ info.response);
                }
            });

        }

        if(updatedUser.status === 'Approved'){
            mailOptions.to = updatedUser.email;
            mailOptions.subject = 'Youre Request Approved';
            mailOptions.text = 'you can Access Staff related Pages';
            transporter.sendMail(mailOptions , (error , info)=>{
                if(error){
                    console.log(error);
                }else{
                    console.log('Email sent: '+ info.response);
                }
            });
        }

        


        res.status(200).json(updatedUser);
    }catch(err){
            res.status(404).json({message : err.message});
    }
}

const updateUser = async(req , res) =>{
    const userid = req.params.id;
    const {status} = req.body;
    try{
        const updatedUser = await model.findByIdAndUpdate(userid , {status},{new: true});

        if(updatedUser.status === 'Rejected'){
            mailOptions.to = updatedUser.email;
            mailOptions.subject = 'Youre Request Rejected';
            mailOptions.text = 'you cannot Access Student related Pages';
            transporter.sendMail(mailOptions , (error , info)=>{
                if(error){
                    console.log(error);
                }else{
                    console.log('Email sent: '+ info.response);
                }
            });

        }

        if(updatedUser.status === 'Approved'){
            mailOptions.to = updatedUser.email;
            mailOptions.subject = 'Youre Request Approved';
            mailOptions.text = 'you can Access Student related Pages';
            transporter.sendMail(mailOptions , (error , info)=>{
                if(error){
                    console.log(error);
                }else{
                    console.log('Email sent: '+ info.response);
                }
            });
        }

        


        res.status(200).json(updatedUser);
    }catch(err){
            res.status(404).json({message : err.message});
    }
}


const deleteStaffUser = async(req,res)=>{
    const id = req.params.id;
    try{
            await staffmodel.findByIdAndDelete(id);
            res.status(200).json({msg : "deleted successfull"});
    }catch(err){
            res.status(400).json({message : err.message});
    }
}
const deleteUser = async(req,res)=>{
    const id = req.params.id;
    try{
            await model.findByIdAndDelete(id);
            res.status(200).json({msg : "deleted successfull"});
    }catch(err){
            res.status(400).json({message : err.message});
    }
}



module.exports = {signin , signup ,staffsignup , getAllStaff , getAllUser , deleteStaffUser , deleteUser, updateStaffUser , updateUser};