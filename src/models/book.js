module.exports = (sequelize, DataTypes) => {
  /**
   * @swagger
   * definitions:
   *   Book:
   *     properties:
   *       id:
   *         type: integer
   *       title:
   *         type: string
   *       description:
   *         type: string
   *       author:
   *         type: string
   *       year:
   *         type: integer
   *       link:
   *         type: string
   *       countTotal:
   *         type: integer
   *       countCurrent:
   *         type: integer
   */
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    countTotal: DataTypes.INTEGER,
    countCurrent: DataTypes.INTEGER,
    author: DataTypes.STRING,
    link: DataTypes.STRING,
    year: DataTypes.INTEGER,
  });

  Book.associate = () => {
    // associations can be defined here
  };

  return Book;
};
