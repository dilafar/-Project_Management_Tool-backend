const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const ResponseSchema = new Schema({
    
    StaffId : {
        type : String,
        default: "true",
    },
    StudentId : {
        type: String,
        default: "ptrue",
      },
    ID: {
        type: String,
        default: "ptrue",
    },
    Type: {
        type: String,
        default: "ptrue",
    },
    status: {
        type : String,
        default: "pending",
    },
    Message : {
        type : String,
        required : true
    },
    
    createdAt:{
        type: Date,
        default: new Date()
    }
}
,
{
    timestamps: true,
}
)

const Response = mongoose.model("Response", ResponseSchema);
module.exports = Response;