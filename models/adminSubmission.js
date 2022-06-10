const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;


const submissionSchema = new Schema({
   
    subject : {
        type : String,
        required : true
    },
    submitURL : {
        type : String,
        required : true
    }
   
   
});

module.exports=mongoose.model("Submissions", submissionSchema);