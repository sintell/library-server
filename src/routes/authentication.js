import Router from 'koa-router';
import passport from 'koa-passport';

const router = new Router();
const strategy = process.env.NODE_ENV === 'development' ? 'local' : 'atlassian-oauth';

router.get('api/auth/atlassian-oauth/callback', passport.authenticate('atlassian-oauth'));

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     tags:
 *       - name: Authentication
 *     description: Authorize user with the given credentials
 *
 *                  - for development environment it will use Local Strategy
 *                    which **won't check for user existance or for password to match**
 *
 *                  - for production it will use Atlassian Oauth Strategy
 *     consumes:
 *       application/json
 *     produces:
 *       application/json
 *     parameters:
 *       - name: credentials
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Credentials'
 *         description: user credentials
 *     responses:
 *       200:
 *         description: user object for current user
 *         schema:
 *           $ref: '#/definitions/User'
 *       404:
 *         description: user not found
 *
 */
router.post(
  '/api/auth/signin',
  passport.authenticate(strategy),
  (ctx) => {
    if (ctx.isAuthenticated) {
      ctx.body = ctx.state.user.toJSON();
    }
  },
);

/**
 * @swagger
 * /auth/signout:
 *   post:
 *     tags:
 *       - name: Authentication
 *     description: Signout current user
 *     responses:
 *       204:
 *         description: successefully signed out
 *       403:
 *         description: you already signed out
 */
router.post('/api/auth/signout', async (ctx) => {
  if (ctx.isUnauthenticated()) {
    ctx.throw(403);
    return;
  }
  ctx.logout();
  ctx.status = 204;
});

export default router;
