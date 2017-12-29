import db from './../models';

const {
  sequelize, User, Book,
} = db;

export const withReaders = query => ({
  model: User,
  attributes: ['id', 'firstName', 'lastName', 'email'],
  where: query || {},
  required: true,
  through: { attributes: ['createdAt'], as: 'readerRecord' },
  as: 'readers',
});

export default function () {
  return {
    async checkOutBook(book, user) {
      return sequelize.transaction(async (transaction) => {
        await book.decrement('countCurrent', { transaction });
        await user.addBooks([book], { transaction });
        return (await Book.findOne({
          where: { id: book.id },
          include: [withReaders()],
          transaction,
        })).readers;
      });
    },
    async checkInBook(book, user) {
      return sequelize.transaction(async (transaction) => {
        const books = await user.getBooks({ where: { bookId: book.id }, transaction });
        if (books.length) {
          throw new Error('User has not checked out this book');
        }

        await user.removeBooks(books, { transaction });
        await books[0].increment('countCurrent', { transaction });

        return (await Book.findOne({
          where: { id: book.id },
          include: [withReaders()],
          transaction,
        })).readers;
      });
    },
    async getReadersByBookId(bookId) {
      return (await Book.findOne({
        where: { id: bookId },
        include: [withReaders()],
      })).readers;
    },
  };
}
