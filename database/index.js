const mongoose = require('mongoose');

// Server Discover and Monitoring engine
mongoose.connect('mongodb://localhost:27017/giftgrid', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('[ Connected to database. ]'))
  .catch((err) => console.error('Error connecting to database', err));

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
  grid_names: [{
    grid_name: String,
    grid_amount: Number,
    grid_complete: [
      Number
    ]
  }]
});

// compiling schema into a model
const User = mongoose.model('users', UserSchema);

module.exports = { User };