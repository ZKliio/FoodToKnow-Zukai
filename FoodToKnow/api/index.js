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


const conn1 = mongoose
     .createConnection('mongodb+srv://admin:helloWorld@cluster0.alrrknh.mongodb.net/',{
     useNewUrlParser: true,
     useUnifiedTopology: true,
     dbName: "Food2Know",
   
 })

const conn2 = mongoose.createConnection('mongodb+srv://Poweryo:U.HuF*k67c$jfgv@cluster0.pqjb66t.mongodb.net/', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'Food2Know',

    })


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

// app.listen(PORT, HOST, () => {
//   console.log(`[${HOST}:${PORT}] Server is running`)
// })
// const PORT = 3000;
// const HOST = '192.168.1.254';


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

