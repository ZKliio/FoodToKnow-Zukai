const mongoose = require('mongoose');

const Meal = new mongoose.Schema({
  userId: { type: String, required: true, unique: false },
  Date: { type: String, required: true },
  selectedFoods: [{ _id: String, name: String, calories: Number, protein: Number, carbs: Number, fat: Number, count: Number }],
  selectedLunches: [{ _id: String, name: String, calories: Number, protein: Number, carbs: Number, fat: Number, count: Number }],
  selectedDinners: [{ _id: String, name: String, calories: Number, protein: Number, carbs: Number, fat: Number, count: Number }],
});



module.exports = Meal;