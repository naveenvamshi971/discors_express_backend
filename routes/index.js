var express = require('express');
var router = express.Router();
var models = require("../models")

/* GET home page. */


router.post('/session', function(request, response) {
  models.users.findAll({
    where:{email:request.body.user.email}
  })
  .then((user)=>response.json({user}))
});

// router.delete('/session', function(request, response) {
//   models.users.findAll({
//     where:{email:request.body.user.email}
//   })
//   .then((user)=>response.json({user}))
// });

// router.post("/",function(request,response){ 
//   models.topics.create({
//       name:request.body.topic.title,
//       category:request.body.topic.category,
//       content:request.body.topic.content
//   }).then(function() {
//     response.send("Successful");
//   }); 
// });

module.exports = router;