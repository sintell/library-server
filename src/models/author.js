export default (sequelize, DataTypes) => {
  /**
   * @swagger
   * definitions:
   *   Author:
   *     properties:
   *       id:
   *         type: integer
   *       name:
   *         type: string
   *         required: true
   */
  const Author = sequelize.define('Author', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  Author.associate = (db) => {
    Author.belongsToMany(db.Book, {
      through: db.AuthorBook, as: 'authors', foreignKey: 'authorId',
    });
  };
  return Author;
};
