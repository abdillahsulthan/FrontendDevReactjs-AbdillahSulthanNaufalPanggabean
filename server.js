const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

const restaurants = require('./restaurant.json');

app.get('/restaurants', (req, res) => {
    res.json(restaurants);
});

app.get('/restaurant/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const restaurant = restaurants.restaurants.find(rest => rest.id === id);
    if (restaurant) {
        res.json(restaurant);
    } else {
        res.status(404).json({ message: 'Restaurant not found' });
    }
});

app.get('/categories', (req, res) => {
    const categories = [...new Set(restaurants.restaurants.flatMap(restaurant => restaurant.categories))];
    res.json(categories);
});

app.get('/restaurants/category/:category', (req, res) => {
    const requestedCategory = req.params.category.toLowerCase();
    const filteredRestaurants = restaurants.restaurants.filter(restaurant =>
        restaurant.categories.map(cat => cat.toLowerCase()).includes(requestedCategory)
    );

    if (filteredRestaurants.length > 0) {
        res.json(filteredRestaurants);
    } else {
        res.status(404).json({ message: `Restaurants in the category '${req.params.category}' not found` });
    }
});


app.listen(port, () => {
    console.log(`API SERVER ON http://localhost:${port}`);
});
