'use strict';

var expect = require('expect.js');

describe('model', function () {
  before(function () {
      return require('../models').sequelize.sync();
  });

  beforeEach(function () {
    this.User = require('../models').users;
    // this.Task = require('../../models').Task;
  });

    it('creation of user', function (done) {
      this.User.create({
            "username": "raichu",
            "createdAt" : "2019-05-31T05:40:57Z",
            "email" : "temporary.first@gmail.com" 
      }).then(function (user) {
          var expectItem=user.dataValues
    //    console.log(user.dataValues);
    expect(expectItem.username).to.equal("raichu");
       done(); 
      });
    });
});
