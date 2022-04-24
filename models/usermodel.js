const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const userSchema = new Schema({
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
    studentID : {
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
    createdAt:{
        type: Date,
        default: new Date()
    }
})

const model = mongoose.model("User",userSchema);
module.exports = model;