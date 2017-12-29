import Router from 'koa-router';
import UserService from '../services/user';

const router = new Router();
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns user data
 *     consumes:
 *       application/json
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
  const us = new UserService();
  const user = await us.getUserById(ctx.params.id);
  if (!user) {
    ctx.throw(404);
    return;
  }
  ctx.body = user.toJSON();
});

export default router;
