module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Readers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    bookId: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['userId', 'bookId'],
      },
    ],
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Readers'),
};
