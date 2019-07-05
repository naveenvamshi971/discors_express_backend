'use strict';
module.exports = (sequelize, DataTypes) => {
  const topics = sequelize.define('topics', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    content:DataTypes.STRING,
    userid:DataTypes.INTEGER,
    viewCount:DataTypes.INTEGER,
    likes:DataTypes.INTEGER
  }, {});
  topics.associate = function(models) {
    // associations can be defined here
    models.topics.belongsTo(models.users, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      }
    });
  };
  return topics;
};