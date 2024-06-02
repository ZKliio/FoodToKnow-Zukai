const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    //whatever other fields you need
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;