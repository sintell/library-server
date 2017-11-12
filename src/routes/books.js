import Router from 'koa-router';
import { Book } from '../models';

const router = new Router();
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
 *     responses:
 *       200:
 *         description: test object
 *         schema:
 *           $ref: '#/definitions/Book'
*       404:
 *         description: Book not found
 */
router.get('/api/book/:id', async (ctx) => {
  const book = await Book.findById(ctx.params.id);
  ctx.body = { book };
});

export default router;
