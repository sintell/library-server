import Router from 'koa-router';
import BookService from '../services/book';
import ReaderService from '../services/reader';

const router = new Router();

/**
 * @swagger
 * /reader/{bookId}:
 *   get:
 *     tags:
 *       - name: Readers
 *     description: Get list of all readers of the book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         type: integer
 *         description: book id
 *     responses:
 *       200:
 *         description: Current readers for the book
 *         type: array
 *         items:
 *           $ref: '#/definitions/Reader'
 *       404:
 *         description: Book isn't found
 *
 */
router.get('/api/reader/:bookId', async (ctx) => {
  if (ctx.isUnauthenticated()) {
    ctx.throw(403);
  }
  const { bookId } = ctx.params;
  const bs = BookService();
  const rs = ReaderService();

  const book = await bs.getBookById(bookId, true);
  if (!book) {
    ctx.throw(404);
  }

  try {
    const readers = await rs.getReadersByBookId(bookId);
    ctx.body = readers.map(reader => reader.toJSON());
  } catch (error) {
    console.error(error);
    ctx.throw(404);
  }
});

/**
 * @swagger
 * /reader/{bookId}:
 *   post:
 *     tags:
 *       - name: Readers
 *     description: Become reader for the book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         type: integer
 *         description: book id
 *     responses:
 *       200:
 *         description: Current readers for the book
 *         type: array
 *         items:
 *           $ref: '#/definitions/Reader'
 *       403:
 *         description: you are not authorized to take a book
 *       404:
 *         description: Book isn't found
 *       409:
 *         description: No more exemlars of this book
 *
 */
router.post('/api/reader/:bookId', async (ctx) => {
  if (ctx.isUnauthenticated()) {
    ctx.throw(403);
  }
  const { bookId } = ctx.params;
  const bs = BookService();
  const rs = ReaderService();

  const book = await bs.getBookById(bookId, true);
  if (!book) {
    ctx.throw(404);
  }

  console.log(book.toJSON());

  if (book.countCurrent === 0) {
    ctx.throw(409);
  }

  try {
    const readers = await rs.checkOutBook(book, ctx.state.user);
    ctx.body = readers.map(reader => reader.toJSON());
  } catch (error) {
    console.error(error);
    ctx.throw(409);
  }
});

/**
 * @swagger
 * /reader/{bookId}:
 *   delete:
 *     tags:
 *       - name: Readers
 *     description: Reaturn book to the library
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         type: integer
 *         description: book id
 *     responses:
 *       200:
 *         description: Current readers for the book
 *         type: array
 *         items:
 *           $ref: '#/definitions/Reader'
 *       403:
 *         description: You are not authorized to return the book
 *       404:
 *         description: Book isn't found
 *       409:
 *         description: Total and current count for the book are mismatched
 */
router.delete('/api/reader/:bookId', async (ctx) => {
  if (ctx.isUnauthenticated()) {
    ctx.throw(403);
  }
  const { bookId } = ctx.params;
  const bs = BookService();
  const rs = ReaderService();

  const book = await bs.getBookById(bookId, true);
  if (!book) {
    ctx.throw(404);
  }

  if (book.countCurrent === book.countTotal) {
    ctx.throw(409);
  }

  try {
    const readers = await rs.checkInBook(book, ctx.state.user);
    ctx.body = readers.map(reader => reader.toJSON());
  } catch (error) {
    console.error(error);
    ctx.throw(403);
  }
});

export default router;
