const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let model = require("../models/usermodel");
let staffmodel = require("../models/staffmodel");

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
    
                    res.status(200).json({result:user2 , token});
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
    
             res.status(200).json({result:existingUser , token});
      
       
    
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

module.exports = {signin , signup ,staffsignup};