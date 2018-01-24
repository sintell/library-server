import Router from 'koa-router';
import BookService from './../services/book';


const router = new Router();

/**
 * @swagger
 * /books:
 *   get:
 *     tags:
 *       - name: Books
 *     description: Returns all books that match query
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authors
 *         in: query
 *         required: false
 *         type: array
 *         description: id of authors
 *         items:
 *           type: integer
 *       - name: tags
 *         in: query
 *         required: false
 *         type: array
 *         description: id of tags
 *         items:
 *           type: integer
 *       - name: title
 *         in: query
 *         required: false
 *         type: string
 *         description: title of the book
 *       - name: itemsPerPage
 *         in: query
 *         required: false
 *         type: integer
 *         description: show items per page
 *       - name: page
 *         in: query
 *         required: false
 *         type: integer
 *         description: current page
 *     responses:
 *       200:
 *         description: Array of Books that match query params
 *         type: array
 *         schema:
 *           $ref: '#/definitions/Book'
 */
router.get('/api/books', async (ctx) => {
  const {
    title, authors, tags, itemsPerPage, page,
  } = ctx.query;
  const bs = BookService();
  const books = await bs.findByCriteria({
    title, authors, tags, itemsPerPage, page,
  });
  ctx.body = books.map(book => book.toJSON());
});

/**
 * @swagger
 * /books:
 *   post:
 *     tags:
 *       - name: Books
 *     description: Add new book to the system
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Book'
 *         description: Book object
 *     responses:
 *       200:
 *         description: Book that was created
 *         schema:
 *
 *           $ref: '#/definitions/Book'
 *       400:
 *         description: Can't create that book
 *       409:
 *         description: There are similar books, pass force paramer
 */
router.post('/api/books', async (ctx) => {
  const {
    title, description, year, link, authors, tags, countTotal,
  } = ctx.request.body;
  const bs = BookService();

  try {
    const book = await bs.createBook({
      title, description, year, link, authors, tags, countTotal,
    });

    ctx.body = book.toJSON();
  } catch (error) {
    console.error(error);
    ctx.throw(409);
  }
});

/**
 * @swagger
 * /book/{id}:
 *   get:
 *     tags:
 *       - name: Books
 *     description: Returns book data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: id of the book
 *     responses:
 *       200:
 *         description: Book with given id
 *         schema:
 *           $ref: '#/definitions/Book'
 *       404:
 *         description: Book not found
 */
router.get('/api/book/:id', async (ctx) => {
  const { id } = ctx.params;
  const bs = BookService();

  const book = await bs.getBookById(id);
  if (!book) {
    ctx.throw(404);
  }
  ctx.body = book.toJSON();
});

/**
 * @swagger
 * /book/{id}:
 *   put:
 *     tags:
 *       - name: Books
 *     description: Edit single book data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: id of the book
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Book'
 *         description: Book object
 *     responses:
 *       200:
 *         description: Book with given id
 *         schema:
 *           $ref: '#/definitions/Book'
 *       404:
 *         description: Book not found
 */
router.put('/api/book/:id', async (ctx) => {
  const { id } = ctx.params;
  const {
    title, description, year, link, authors, tags, countTotal,
  } = ctx.request.body;
  const bs = BookService();

  const book = await bs.updateBook({
    id, title, description, year, link, authors, tags, countTotal,
  });

  ctx.body = book;
});


export default router;
