module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'team', {
    type: Sequelize.STRING,
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Users', 'team'),
};
