import swaggerJSDoc from 'swagger-jsdoc';
import Router from 'koa-router';

export function getSwaggerSpec() {
  // swagger definition
  const swaggerDefinition = {
    info: {
      title: 'hh-library API',
      version: '0.0.1',
      description: 'Base RESTful API to hh library service',
    },
    basePath: '/api',
    host: 'localhost:3000',
    schemes: ['http'],
  };

  // options for the swagger docs
  const options = {
    // import swaggerDefinitions
    swaggerDefinition,
    // path to the API docs
    apis: ['build/*.js', 'src/models/*.js'],
  };

  // initialize swagger-jsdoc
  return swaggerJSDoc(options);
}

const swaggerSpec = getSwaggerSpec();
const swaggerRouter = new Router();

swaggerRouter.get('/swagger/docs.json', (ctx) => {
  ctx.body = swaggerSpec;
});

export default swaggerRouter;

