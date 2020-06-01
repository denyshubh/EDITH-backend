'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.sequelize.query('CREATE EXTENSION if not exists pgcrypto').then(() => {
      return queryInterface.createTable('liked', {
        like_id: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true
        },
        user_id: {
          type: Sequelize.STRING,
          allowNull: false,
          references: 'user',
          referencesKey: 'user_id'
        },
        vin: {
          type: Sequelize.STRING,
          allowNull: false
        },
        liked: Sequelize.INT(1)
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
    return queryInterface.dropTable('liked')
  }
};
