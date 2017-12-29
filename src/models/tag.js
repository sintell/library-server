module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    text: {
      type: DataTypes.STRING,
      unique: true,
    },
  });
  /**
   * @swagger
   * definitions:
   *   Tag:
   *     properties:
   *       id:
   *         type: integer
   *       text:
   *         required: true
   *         type: string
   */
  Tag.association = (db) => {
    Tag.belongsToMany(db.Book, {
      through: 'TagBook', as: 'tags', foreignKey: 'tagId',
    });
  };
  return Tag;
};
