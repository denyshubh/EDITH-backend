'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.sequelize.query('CREATE EXTENSION if not exists pgcrypto').then(() => {
      return queryInterface.createTable('car', {
        vin: {
          type: Sequelize.STRING,
          allownull: false,
          primaryKey: true
        },
        make_id: {
          type: Sequelise.STRING,
          references: "make"
          referencesKey: "make_id"
        },
         model_id: {
          type: Sequelise.STRING,
          references: "model"
          referencesKey: "model_id"
        },
        year: Sequelise.INTEGER(4),
        ecrgradeid: Sequelise.INTEGER(3),
        mileage: Sequelise.INTEGER(8),
        saleurl: Sequelise.STRING,
        location_id: {
          type: Sequelise.STRING,
          references: "location"
          referencesKey: "location_id"
        },
        createdate: Sequelise.DATE
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
        return queryInterface.dropTable('car')
  }
};
