var express = require("express");
var router = express.Router();
var models = require("../models");

/* GET users listing. */

router.get("/", function(request, response) {
  models.users.findByPk(6).then(user => response.json({ user }));
});

router.post("/", function(request, response) {
  // console.log("######",request.body.user)
  models.users
    .create({
      username: request.body.user.username,
      password: request.body.user.password,
      email: request.body.user.email,
      profileImage: "https://image.flaticon.com/icons/svg/145/145846.svg"
    })
    .then(function() {
      response.send("Successful");
      // response.redirect("http://localhost:3001/");
      // response.redirect("Successful");
    });
});

router.patch("/", function(request, response) {
  // console.log(request.body.user.image);
  models.users
    .update(
      {
        username: request.body.user.username,
        password: request.body.user.password,
        profileImage: request.body.user.image
      },
      { where: { id: 4 } }
    )
    .then(function() {
      response.send("Successful");
    });
});

router.delete("/", function(request, response) {
  models.users
    .destroy({
      where: { id: 1 }
    })
    .then(function(user_d) {
      // if (user_d) response.json(user_d, "User is deleted is successfully");
      // else response.json(user_d);
      response.json("User is deleted is successfully")
    });
});

module.exports = router;
