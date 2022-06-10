const router=require("express").Router();
const { response } = require("express");
let Submissions=require("../models/adminSubmission");


router.route("/submission").post((req,res)=>{
    
    
    const subject=req.body.subject;
    const submitURL=req.body.submitURL;
    

    const values = new Submissions({
       
        subject,
        submitURL
      

    })
    values.save().then(()=>{
        res.json("Submissuion Added")
    }).catch((err)=>{
        console.log(err);
    })

});


router.route('/details').get((req, res) => {
    Submissions.find()
      .then(submission => res.json(submission))
      .catch(err => res.status(400).json('Error: ' + err));
  });



   
module.exports = router;