var express = require('express');
var router = express.Router();
var models = require("../models")

router.get('/:category_name/topics', function(request, response) {
  models.topics.findAll({
      where:{category:request.params.category_name}
  })
  .then((topic)=>response.json({topic}))
  .catch(err => res.status(400).json({ err: `Category [${request.params.category_name}] doesn\'t exist.`}))
});


module.exports = router;