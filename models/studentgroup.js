const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const studentgroupSchema = new Schema({
   
    leader : {
        type : String,
        required : true
    },
    leaderid : {
        type : String,
        required : true
    },
    student1 : {
        type : String,
        required : true
    },
    student1id : {
        type : String,
        required : true
    },
    student2:{
        type : String,
        required : true
    },
    student2id:{
        type : String,
        required : true
    },
    student3 : {
        type : String,
        required : true
    },
    student3id : {
        type : String,
        required : true
    },
    Supervisor: {
        type: String,
        default: "pending",
      },
     
    CoSupervisor: {
        type: String,
        default: "pending",
      },
    userId: {
        type: String,
        default: "pending",
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

const group = mongoose.model("StudentGroup", studentgroupSchema);
module.exports = group;