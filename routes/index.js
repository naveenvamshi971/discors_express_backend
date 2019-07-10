var express = require('express');
var router = express.Router();
var models = require("../models")
var Sequelize= require("sequelize")
var op=Sequelize.Op
/* GET home page. */


router.post('/session', function(request, response) {
  // console.log("****",request.body)
  models.users.findAll({
    where:{
      [op.or]:[{email:request.body.user.email,password:request.body.user.password},{username:request.body.user.email,password:request.body.user.password}]}
  })
  .then((user) =>{
    // console.log("@@@@1 ",user)

    if (user.length <= 0){
      response.json("failed")
   }
    else{
      response.json({"user":{"userID":user[0].id,"username":user[0].username,"createdAt":user[0].createdAt,"email":user[0].email,"profileImage":user[0].profileImage}})
    }
  })
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