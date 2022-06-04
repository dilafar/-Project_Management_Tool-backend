const router=require("express").Router();
const {response} = require("express");
let MsSubmissions = require("../models/msSubmission_model");


router.route("/MsSubmission").post((req,res)=>{

    const subject=req.body.subject;
    const submitURL=req.body.submitURL;
    const  submitDateTime=req.body.submitDateTime;

    const values = new MsSubmissions({

        subject,
        submitURL,
        submitDateTime
    })
    values.save().then(()=>{
        res.json("Submission Added")
    }).catch((err)=>{
        console.log(err);
    })

    router.route('/details').get((req, res) => {
        MsSubmissions.find()
          .then(mssubmission => res.json(mssubmission))
          .catch(err => res.status(400).json('Error: ' + err));
      });


});

module.exports = router;