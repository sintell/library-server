export default (sequelize, DataTypes) => {
  const TagBook = sequelize.define('TagBook', {
    tagId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
  }, {
    indexes: [
      {
        unique: true,
        fields: ['tagId', 'bookId'],
      },
    ],
  });
  return TagBook;
};
