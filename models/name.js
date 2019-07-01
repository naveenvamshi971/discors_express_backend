'use strict';
module.exports = (sequelize, DataTypes) => {
  const name = sequelize.define('name', {
    username: DataTypes.STRING
  }, {});
  name.associate = function(models) {
    // associations can be defined here
  };
  return name;
};