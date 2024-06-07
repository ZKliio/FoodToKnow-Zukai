const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');

// mongoose
//      .connect('mongodb+srv://admin:helloWorld@cluster0.alrrknh.mongodb.net/',{
//      useNewUrlParser: true,
//      useUnifiedTopology: true,
//      dbName: "Food2Know",
   
//  }).then(() =>{
//     console.log("Connected to MongoDB")
// }).catch((err) => {
//     console.log("Error connecting to MongoDB" + err);
// })

const conn1 = mongoose
     .createConnection('mongodb+srv://admin:helloWorld@cluster0.alrrknh.mongodb.net/',{
     useNewUrlParser: true,
     useUnifiedTopology: true,
     dbName: "Food2Know",
   
 })
//  .then(() =>{
//     console.log("Connected to ZK MongoDB")
// }).catch((err) => {
//     console.log("Error connecting to MongoDB" + err);
// })

const conn2 = mongoose.createConnection('mongodb+srv://Poweryo:U.HuF*k67c$jfgv@cluster0.pqjb66t.mongodb.net/', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'Food2Know',

    })
//     .then(() =>{
//     console.log("Connected to KX MongoDB")
// }).catch((err) => {
//     console.log("Error connecting to MongoDB" + err);
// })



const Food = conn1.model('food', require("./models/foodInfo"));
const Meal = conn2.model('meals', require("./models/meal"));

app.get("/foodInfo", (req, res) => {
    Food.find()
        .then(FoodInfo => {
            res.status(200).json(FoodInfo);
        })
        .catch(error => {
            res
            .status(500)
            .json({ message: "An error occurred while getting the info" });
        });
    });

app.listen(port, () => {
      console.log("Server listening on port " + port);
    })

// Connect to MongoDB
// mongoose.connect('mongodb+srv://Poweryo:U.HuF*k67c$jfgv@cluster0.pqjb66t.mongodb.net/', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: 'Food2Know',
//   })
//   .then(() => {
//     console.log('Connected to the Database.');
//   })
//   .catch(err => console.error(err));



// // const Food = require("./models/foodInfo");
// // const { error } = require('console');

// //endpoint for retrieving foodInfo

//Routes
app.post('/meals', async (req, res) => {
  const { name, details, healthCondition } = req.body;
  const meal = new Meal({ name, details, healthCondition });
  await meal.save();
  res.status(201).send(meal);
});

app.get('/meals', async (req, res) => {
  const { healthCondition } = req.query;
  let meals;
  if (healthCondition) {
    const regex = new RegExp(healthCondition, 'i'); // Case-insensitive regex
    meals = await Meal.find({ healthCondition: { $regex: regex } });
  } else {
    meals = await Meal.find();
  }
  res.status(200).send(meals);
});

app.delete('/meals/:id', async (req, res) => {
  const { id } = req.params;
  await Meal.findByIdAndDelete(id);
  res.status(204).send();
});

app.put('/meals/:id', async (req, res) => {
  const { id } = req.params;
  const { name, details, healthCondition } = req.body;
  const meal = await Meal.findByIdAndUpdate(id, { name, details, healthCondition }, { new: true });
  res.status(200).send(meal);
});

