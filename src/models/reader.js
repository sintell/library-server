export default (sequelize, DataTypes) => {
  /**
   * @swagger
   * definitions:
   *   ReaderRecord:
   *     properties:
   *       createdAt:
   *         type: string
   *         format: dateTime
   */

  /**
   * @swagger
   * definitions:
   *   Reader:
   *     properties:
   *       id:
   *         type: integer
   *       firstName:
   *         type: string
   *       lastName:
   *         type: string
   *       email:
   *         type: string
   *       readerRecord:
   *         type: object
   *         $ref: '#/definitions/ReaderRecord'
   */
  const Reader = sequelize.define('Reader', {
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
  }, {
    indexes: [
      {
        unique: true,
        fields: ['userId', 'bookId'],
      },
    ],
  });

  return Reader;
};
