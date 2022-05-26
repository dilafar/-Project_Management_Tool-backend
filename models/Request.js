const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const RequestSchema = new Schema({
    
    StudentId: {
        type : String,
        default: "true",
    },
    StaffId: {
        type: String,
        default: "ptrue",
      },
    topic : {
        type : String,
        required : true
    },
    discription : {
        type : String,
        required : true
    },
    technology : {
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

const Request = mongoose.model("Request", RequestSchema);
module.exports = Request;