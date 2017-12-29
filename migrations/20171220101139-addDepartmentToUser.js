module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'department', {
    type: Sequelize.STRING,
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Users', 'department'),
};
