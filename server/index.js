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

app.post('/adduser', (req, res) => {
  db.User.insertMany(req.body, (err,results) => {
    if (err) {
      res.status(500);
    } else {
      res.status(200).send('Success');
    }
  })
});

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
