var mongoose = require('mongoose');
var Friend = mongoose.model('Friend'); // access Friend Model;

module.exports = (function(){
  return{
    show: function(req, res){
      Friend.find({}, function(err, friends){
        if(err){
          res.json(err);
        }
        else{
          res.json(friends);
        }
      });
    },

    showOne: function(req, res){
      Friend.findOne({_id: req.params.id}, function(err, friend){
        console.log(friend);
        if(err){
          res.json(err);
        }
        else{
          res.json(friend);
        }
      });
    },

    add: function(req, res){
      var friend = new Friend({
          name: req.body.name,
          age: req.body.age
      });

      friend.save(function(err){
        if(err){
          res.json({
            status: "error",
            message: "Something went wrong..."
          });
        }
        else{
          res.json({
            status: "success",
            message: "Successfully added!"
          });
        }
      });
    },

    delete: function(req, res){
      Friend.remove({_id: req.params.id}, function(err){
        if(err){
          res.json({
            status: "error",
            message: "Something went wrong..."
          });
        }
        else{
          res.json({
            status: "success",
            message: "Successfully deleted!"
          });
        }
      });
    },

    update: function(req, res){
      console.log(req.body);
      Friend.update({"_id": req.body._id}, {$set: {"name": req.body.name, "age": req.body.age}}, function(err){
        if(err){
          res.json({
            status: "error",
            message: "Something went wrong..."
          });
        }
        else{
          res.json({
            status: "success",
            message: "Successfully Updated!"
          });
        }
      });
    },

 };
})();
