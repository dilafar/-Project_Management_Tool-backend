const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const staffSchema = new Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    dob : {
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    contactnumber : {
        type : String,
        required : true
    },
    staffID : {
        type : String,
        required : true
    },
    faculty : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    educationQualification : {
        type : String,
        required : true
    },
    researchSpeacializedArea : {
        type : String,
        required : true
    },
    pastresearchexperiance : {
        type : String,
        required : true
    },
    status: {
        type: String,
        default: "pending",
      },
      panel: {
        type : String,
        default: "Assign a Panel",
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

const staffmodel = mongoose.model("Staff",staffSchema);
module.exports = staffmodel;