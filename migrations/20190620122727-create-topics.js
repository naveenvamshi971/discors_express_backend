'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('topics', {
      id: {
        // allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      userid:{
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        }
      },
      likes:{
        // allowNull: false,
        type: Sequelize.INTEGER
      },
      comments:{
        type: Sequelize.STRING
      },
      createdAt: {
        // allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        // allowNull: false,
        type: Sequelize.DATE  
      },
      content:{
        type: Sequelize.STRING
      },
      username:{
        type: Sequelize.STRING
      },
      createdBy:{
        type: Sequelize.STRING
      },
      lastReply:{
        type: Sequelize.STRING
      },
      replyCount:{
        type: Sequelize.INTEGER
      },
      viewCount:{
        type: Sequelize.INTEGER
      },
      userCount:{
        type: Sequelize.INTEGER
      },
      category:{
        type: Sequelize.INTEGER 
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('topics');
  }
};