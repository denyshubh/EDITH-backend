'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION if not exists pgcrypto').then(() => {
      return queryInterface.createTable('model', {
        model_id: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true
        },
        model: Sequelize.STRING
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('model');
  }
};
