import Koa from 'koa';
import koaSwagger from 'koa2-swagger-ui';
import routes from './routes';

const logger = console;

const app = new Koa();

const port = process.env.PORT || 3000;

app.use(koaSwagger({
  swaggerOptions: {
    url: 'http://localhost:3000/swagger/docs.json', // example path to json
  },
}));

routes.forEach((route) => {
  app
    .use(route.routes())
    .use(route.allowedMethods());
});


app.listen(port, () => logger.log(`started server at :${port}`));
