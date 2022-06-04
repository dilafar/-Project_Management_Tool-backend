const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;


const submissionTemSchema = new Schema({
   
    subject : {
        type : String,
        required : true
    },
    submitURL : {
        type : String,
        required : true
    },
    deadline : {
        type : String,
        required : true
    }
   
   
});

module.exports=mongoose.model("SubmissionsTem", submissionTemSchema);