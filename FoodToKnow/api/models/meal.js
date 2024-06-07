const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    details: {
        type: String,
        unique: true,
        required: true,
    },
    healthCondition: {
        type: String,
        
    },
  });
  

  module.exports = mealSchema;