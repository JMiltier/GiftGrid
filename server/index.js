const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const db = require('../database/index.js');
const stripe = require('stripe')('sk_test_51HAJGjIBeSXSsMg7tTwMMZjjk71AF4tHZc4yURmSVgnXwwXgTy9b5Crh7KlhpRTKSMs5wdVrKjM9n8eGGC8Y3YNN00mJIWXQ8p');
const uuid = require ('uuid/v4');


const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors()); // cross-origin resource sharing
app.use(bodyParser.json()); // stream and exposed incoming request body
app.use(morgan('dev')); // middleware logger for node
app.use(express.json()); // recognize incoming request as a JSON object
app.use(express.static(path.join(__dirname, '../src')));

// Stripe Payment
app.post('/payment', async (req, res) => {
  const { price, gridName, token } = req.body;
  const customer = await stripe.customers.create({
    email: token.email,
    source: token.id
  });
  const idempotencyKey= uuid();
  // Create a PaymentIntent with the order amount and currency
  const charge = await stripe.charges.create({
    amount: price * 100,
    currency: 'usd',
    customer: customer.id,
    receipt_email: token.email,
    description: `Purchased $${price} cell from gift grid ${gridName}`,
  }, {idempotencyKey});
  res.send({ charge });
});

// Wipe out entire collection (users and their grids)
app.get('/deleteall', (req, res) => {
  db.User.deleteMany()
    .then((data) => console.log('Deleted', data.deletedCount))
    .catch((err) => console.log('Unable to delete', err.message));
});

// Delete all of the user's grids
app.post('/deleteall', (req, res) => {
  db.User.deleteMany({ username: req.body.username, grid_names: [] })
    .then((data) => console.log('Deleted', data.deletedCount))
    .catch((err) => console.log('Unable to delete', err.message));
});

app.get('/user', (req, res) => {
  // for all in database: db.Store.find().exec((err, results) => {
  // db.Store.aggregate([{$sample:{size:1}}]).exec((err, results) => {
  db.User.findOne(req.query, (err, results) => {
    if (err || results === null) {
      res.status(500).send(null);
    } else {
      res.status(200).json({
        username: results.username,
        grids: results.grid_names
      });
    }
  });
})

// GET ALL GRIDS BY NAME FOR CURRENT USER
app.get('/gridnames', (req, res) => {
  // for all in database: db.Store.find().exec((err, results) => {
  // db.Store.aggregate([{$sample:{size:1}}]).exec((err, results) => {
  db.User.find(req.query, (err, results) => {
    if (err || results === null) {
      res.status(500).send(null);
    } else {
      let grids = results[0].grid_names.map((name) => [name.grid_name, name.grid_amount]);
      res.status(200).json(grids);
    }
  });
})

app.post('/adduser', (req, res) => {
  db.User.insertMany(req.body, (err,results) => {
    if (err) {
      res.status(500);
    } else {
      res.status(200).send('Success');
    }
  })
});

// INSERT NEW GRID INTO USERS COLLECTOIN
app.post('/addgrid', (req, res) => {
  console.log(req.body);
  const query = { grid_names: {grid_name: req.body.gridName, grid_amount: req.body.gridAmount }};
  db.User.update({username: req.body.username }, { $addToSet: query }, (err,results) => {
    if (err) {
      res.status(500);
    } else {
      res.status(200).send('Success');
    }
  })
});

// UPDATE AN EXISTING GRID (Name or value)
app.post('/addpayment', (req, res) => {
  console.log(req.body);
  const find = { username: req.body.username, 'grid_names.grid_name': req.body.gridName };
  const query = { grid_complete: req.body.price };
  db.User.update(find, { $addToSet: query }, (err,results) => {
    if (err) {
      res.status(500);
    } else {
      console.log(results);
      res.status(200).send('Success');
    }
  })
});

// UPDATE AN EXISTING GRID (Name or value)
app.post('/updategrid', (req, res) => {
  console.log(req.body);
  const query = { grid_names: {grid_name: req.body.gridName, grid_amount: req.body.gridAmount }};
  db.User.update({username: req.body.username }, query, (err,results) => {
    if (err) {
      res.status(500);
    } else {
      res.status(200).send('Success');
    }
  })
});

// DELETE AN EXISTING GRID
app.post('/deletegrid', (req, res) => {
  console.log(req.body);
  const find = { 'grid_names.grid_name': req.body.gridName };
  db.User.find(find, (err,results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      console.log(results);
      res.status(200).send('Success');
    }
  })
});

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
