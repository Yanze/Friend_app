var mongoose = require("mongoose");

var fs = require("fs"); // for loading model files;

var path = require("path"); // for getting model path;

// connect to mongoose;
mongoose.connect('mongodb://localhost/friends');
var models_path = __dirname + '/../models';

fs.readdirSync(models_path).forEach(function(file){
  if(file.indexOf('.js') >= 0){
    require(models_path+'/'+file);
  }
});
