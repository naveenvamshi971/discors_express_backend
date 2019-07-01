'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    topicId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  comments.associate = function(models) {
    // associations can be defined here
    models.comments.belongsTo(models.topics, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      }
    });
    models.comments.belongsTo(models.users, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      }
    });
  };
  return comments;
};