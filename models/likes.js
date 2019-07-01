'use strict';
module.exports = (sequelize, DataTypes) => {
  const likes = sequelize.define('likes', {
    userId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER

  }, {});
  likes.associate = function(models) {
    // associations can be defined here
    models.likes.belongsTo(models.topics, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      }
    });
  };
  return likes;
};