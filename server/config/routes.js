var friends = require('./../controllers/friends.js');

module.exports = function(app){
  app.get('/friends', friends.show);
  app.get('/get-one/:id', friends.showOne);
  app.post('/add-friend', friends.add);
  app.delete('/delete-friend/:id', friends.delete);
  app.put('/update-friend', friends.update);
};
