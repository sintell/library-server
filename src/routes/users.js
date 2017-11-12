import Router from 'koa-router';
import { User } from '../models';

const router = new Router();
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns user data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: User with given id
 *         schema:
 *           $ref: '#/definitions/User'
 *       404:
 *         description: User not found
 */
router.get('/api/user/:id', async (ctx) => {
  const user = await User.findById(ctx.params.id);
  if (!user) {
    ctx.throw(404, 'user not found');
    return;
  }
  ctx.body = { user };
});

export default router;
