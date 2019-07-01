'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: DataTypes.STRING,
    password:DataTypes.STRING,
    email:DataTypes.STRING,
    profileImage:DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here
    // models.users.hasMany(models.comments);
    models.users.hasMany(models.topics);
  };
  return users;
};