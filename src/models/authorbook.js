export default (sequelize, DataTypes) => {
  const AuthorBook = sequelize.define('AuthorBook', {
    authorId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
  }, {
    indexes: [
      {
        unique: true,
        fields: ['authorId', 'bookId'],
      },
    ],
  });

  return AuthorBook;
};
