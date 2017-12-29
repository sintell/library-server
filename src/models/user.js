export default (sequelize, DataTypes) => {
  /**
   * @swagger
   * definitions:
   *   Credentials:
   *     properties:
   *       email:
   *         required: true
   *         type: string
   *         format: email
   *       password:
   *         required: true
   *         type: string
   *         format: password
   */
  /**
   * @swagger
   * definitions:
   *   User:
   *     properties:
   *       id:
   *         type: integer
   *       firstName:
   *         type: string
   *       lastName:
   *         type: string
   *       email:
   *         type: string
   *       department:
   *         type: string
   *       team:
   *         type: string
   *       createdAt:
   *         type: string
   *         format: dateTime
   *       updatedAt:
   *         type: string
   *         format: dateTime
   */
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    department: DataTypes.STRING,
    team: DataTypes.STRING,
  });

  User.associate = (db) => {
    User.belongsToMany(db.Book, {
      through: db.Reader, as: 'books', foreignKey: 'userId', otherKey: 'bookId',
    });
  };

  return User;
};
