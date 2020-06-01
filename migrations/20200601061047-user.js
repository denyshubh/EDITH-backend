'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION if not exists pgcrypto').then(() => {
      return queryInterface.createTable('user', {
        user_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.fn('gen_random_uuid'),
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(50),
          isEmail: true,
          allowNull: false,
        },
        token: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        is_admin: { type: Sequelize.INTEGER, defaultValue: 0 }
      }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true
      })
    })
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('user')
  }
};
