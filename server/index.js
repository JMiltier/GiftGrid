const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const db = require('../database/index.js');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors()); // cross-origin resource sharing
app.use(bodyParser.json()); // stream and exposed incoming request body
app.use(morgan('dev')); // middleware logger for node
app.use(express.json()); // recognize incoming request as a JSON object
app.use(express.static(path.join(__dirname, '../src')));

app.get('/deleteall', (req, res) => {
  db.User.deleteMany()
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

// UPDATE AN EXISTING GRID
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
  const query = { grid_names: {grid_name: req.body.gridName, grid_amount: req.body.gridAmount }};
  db.User.update({username: req.body.username }, { $slice: query }, (err,results) => {
    if (err) {
      res.status(500);
    } else {
      res.status(200).send('Success');
    }
  })
});

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
