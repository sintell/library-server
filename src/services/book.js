import db from './../models';
import AuthorService from './author';
import { withReaders } from './reader';
import TagService from './tag';

const DEFAULT_ITEMS_PER_PAGE = 20;
const {
  Book, Author, Tag, sequelize,
} = db;
const { Op } = db.Sequelize;
const withAuthors = query => ({
  model: Author,
  attributes: ['id', 'name'],
  where: query || {},
  required: true,
  through: { attributes: [] },
  as: 'authors',
});

const withTags = query => ({
  model: Tag,
  attributes: ['id', 'text'],
  where: query || {},
  required: true,
  through: { attributes: [] },
  as: 'tags',
});

export default function () {
  return {
    async findByCriteria({
      title = '', authors = [], tags = [], itemsPerPage = DEFAULT_ITEMS_PER_PAGE, page = 0,
    }) {
      const tagsQuery = tags.length ? { id: { [Op.in]: tags } } : {};
      const authorsQuery = authors.length ? { id: { [Op.in]: authors } } : {};
      const books = await Book.findAll({
        offset: page * itemsPerPage,
        limit: itemsPerPage,
        where: {
          title: { [Op.like]: `${title}%` },
        },
        include: [withAuthors(authorsQuery), withTags(tagsQuery), withReaders()],
      });

      return books;
    },
    async createBook({
      title = '', description = '', year = 0, link = '', authors = [], tags = [], countTotal,
    }) {
      return sequelize.transaction(async (transaction) => {
        const asv = AuthorService();
        const tsv = TagService();

        const bookAuthors = await asv.createBatch(authors, transaction);
        const bookAuthorIds = bookAuthors.map(ba => ba.id);

        const bookTags = await tsv.createBatch(tags, transaction);
        const bookTagIds = bookTags.map(bt => bt.id);

        const [book, created] = await Book.findOrCreate({
          where: { title, year },
          defaults: {
            title, description, year, link, countCurrent: countTotal, countTotal,
          },
          transaction,
        });

        if (created) {
          await book.setAuthors(bookAuthorIds, { transaction });
          await book.setTags(bookTagIds, { transaction });
        }

        return book.reload({
          include: [withAuthors(), withTags()],
          transaction,
        });
      });
    },
    async getBookById(id, bookOnly) {
      const includes = bookOnly ? [] : [withAuthors(), withTags()];
      return Book.findById(id, {
        include: includes,
      });
    },
    async updateBook({
      id, title, description, year, link, authors = [], tags = [], countTotal,
    }) {
      return sequelize.transaction(async (transaction) => {
        const book = await Book.findById(id, {
          transaction,
        });
        const asv = AuthorService();
        const tsv = TagService();

        const bookAuthors = await asv.createBatch(authors, transaction);
        const bookAuthorIds = bookAuthors.map(ba => ba.id);

        const bookTags = await tsv.createBatch(tags, transaction);
        const bookTagIds = bookTags.map(bt => bt.id);

        await book.setAuthors(bookAuthorIds, { transaction });
        await book.setTags(bookTagIds, { transaction });
        await book.increment(
          ['countTotal', 'countCurrent'],
          { by: countTotal - book.countTotal, transaction },
        );

        await book.update({
          title, description, year, link,
        }, { transaction });

        return book.reload({
          include: [withAuthors(), withTags(), withReaders()],
          transaction,
        });
      });
    },
  };
}
