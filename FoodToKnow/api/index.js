const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const conn1 = mongoose.createConnection('mongodb+srv://admin:helloWorld@cluster0.alrrknh.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Food2Know',
});

const conn2 = mongoose.createConnection('mongodb+srv://Poweryo:U.HuF*k67c$jfgv@cluster0.pqjb66t.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Food2Know',
});

const Food = conn1.model('food', require('./models/foodInfo'));
const Meal = conn2.model('Meal', require('./models/meal'));

// Fetch all food info
app.get('/foodInfo', (req, res) => {
  Food.find()
    .then(foodInfo => {
      res.status(200).json(foodInfo);
    })
    .catch(error => {
      res.status(500).json({ message: 'An error occurred while getting the info' });
    });
});

// Fetch meals by userId and date
app.get('/meals/:userId/:date', async (req, res) => {
  const { userId, date } = req.params;
  try {
    const meals = await Meal.findOne({ userId, Date: date });
    if (!meals) {
      return res.status(404).json({ error: 'Meals not found for this user and date' });
    }
    res.status(200).json(meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).send('Error fetching meals');
  }
});

// Upsert meals for a specific user
app.put('/meals/:userId/:date', async (req, res) => {
  const { userId, date } = req.params;
  const { selectedFoods, selectedLunches, selectedDinners } = req.body;

  try {
    const meal = await Meal.findOneAndUpdate(
      { userId, date },
      {
        $set: {
          selectedFoods,
          selectedLunches,
          selectedDinners,
        },
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Meals updated successfully', meal });
  } catch (error) {
    console.error('Error updating meals:', error);
    res.status(500).send('Error updating meals');
  }
});

// Create meals for a specific user (alternative to put)
app.post('/meals/:userId', async (req, res) => {
  const { userId } = req.params;
  const { selectedFoods, selectedLunches, selectedDinners, date } = req.body;

  try {
    const existingMeal = await Meal.findOne({ userId, date });

    if (existingMeal) {
      return res.status(400).json({ message: 'Meal for this user already exists. Use PUT to update.' });
    }

    const newMeal = new Meal({
      userId,
      selectedFoods,
      selectedLunches,
      selectedDinners,
      Date: date,
    });

    await newMeal.save();

    res.status(201).json({ message: 'Meals created successfully', meal: newMeal });
  } catch (error) {
    console.error('Error creating meals:', error);
    res.status(500).send('Error creating meals');
  }
});

// DELETE route to delete an item by itemId
app.delete('/meals/:userId/:itemId', async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    const meal = await Meal.findOneAndUpdate(
      { userId },
      {
        $pull: {
          selectedFoods: { _id: itemId },
          selectedLunches: { _id: itemId },
          selectedDinners: { _id: itemId },
        },
      },
      { new: true }
    );

    if (!meal) {
      return res.status(404).json({ error: 'Meal not found or item not found in any array' });
    }

    res.json({ message: 'Item deleted successfully', meal });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE route to delete meals by userId
app.delete('/meals/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await Meal.deleteOne({ userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Meals not found for this user' });
    }

    res.json({ message: 'Meals deleted successfully' });
  } catch (error) {
    console.error('Error deleting meals:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
