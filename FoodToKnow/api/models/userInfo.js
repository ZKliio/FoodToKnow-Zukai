const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        // required: true,
    },
    name:{
        type: String,
        // unique: true,
        // required: true,     
    },
    email:{
        type: String,
        unique: true,
        // required: true,
    },
    caloriesreq: {
        type: Number,
        required: true,
    },
    proteinsreq:{
        type: Number,
        required: true,
    }
    //whatever other fields you need
});


module.exports = userSchema;