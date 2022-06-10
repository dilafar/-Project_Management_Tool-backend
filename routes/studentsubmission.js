const router=require("express").Router();
const { response } = require("express");
let SubmissionsTem=require("../models/studentSubmission");


router.route("/submissiontemplate").post((req,res)=>{
    
    
    const subject=req.body.subject;
    const submitURL=req.body.submitURL;
    const deadline=req.body.deadline;
    

    const values = new SubmissionsTem({
       
        subject,
        submitURL,
        deadline
      

    })
    values.save().then(()=>{
        res.json("Template Added")
    }).catch((err)=>{
        console.log(err);
    })

});


router.route('/temdetails').get((req, res) => {
    SubmissionsTem.find()
      .then(submission => res.json(submission))
      .catch(err => res.status(400).json('Error: ' + err));
  });



   
module.exports = router;