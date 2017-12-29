module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Users', ['email'], {
    type: 'unique',
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeIndex('Users', 'email'),
};
