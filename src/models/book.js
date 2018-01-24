export default (sequelize, DataTypes) => {
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
   *       authors:
   *         type: array
   *         items:
   *           $ref: '#/definitions/Author'
   *       tags:
   *         type: array
   *         items:
   *           $ref: '#/definitions/Tag'
   *       readers:
   *         type: array
   *         items:
   *           $ref: '#/definitions/Reader'
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
    link: DataTypes.STRING,
    year: DataTypes.INTEGER,
  });

  Book.associate = (db) => {
    Book.belongsToMany(db.Author, {
      through: db.AuthorBook, as: 'authors', foreignKey: 'bookId', otherKey: 'authorId',
    });
    Book.belongsToMany(db.Tag, {
      through: 'TagBook', as: 'tags', foreignKey: 'bookId', otherKey: 'tagId',
    });

    Book.belongsToMany(db.User, {
      through: db.Reader, as: 'readers', foreignKey: 'bookId', otherKey: 'userId',
    });
  };

  return Book;
};
