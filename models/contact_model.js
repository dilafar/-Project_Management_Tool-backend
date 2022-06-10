const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,

    },

    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,

    },

    comment:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },


}, {
    timestamps: true,
});

const contact = mongoose.model("contact", contactSchema);

module.exports = contact;