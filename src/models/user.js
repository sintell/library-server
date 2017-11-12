export default function Book(sequelize, DataTypes) {
  /**
   * @swagger
   * definitions:
   *   User:
   *     properties:
   *       firstName:
   *         type: string
   *       lastName:
   *         type: string
   *       email:
   *         required: true
   *         type: string
   *       password:
   *         type: string
   */
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  User.associate = () => {
    // associations can be defined here
  };

  return User;
}
