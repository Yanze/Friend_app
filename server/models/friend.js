var mongoose = require('mongoose');

var FriendSchema = new mongoose.Schema({
  name: String,
  age: Number
});

// register schema as a model;
mongoose.model('Friend', FriendSchema);
