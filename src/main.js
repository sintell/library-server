import Koa from 'koa';
import koaSwagger from 'koa2-swagger-ui';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import passport from 'koa-passport';
import cors from 'koa-cors';
import routes from './routes';
import './services/auth';

const port = process.env.PORT || 3000;
const logger = console;

const app = new Koa();
app.keys = ['god save us all'];

const CONFIG = {
  key: 'hhlib:sess',
  signed: false,
};

app.use(bodyParser());
app.use(session(CONFIG, app));
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(koaSwagger({
  swaggerOptions: {
    url: 'http://localhost:3000/swagger/docs.json',
  },
  hideTopbar: true,
}));

routes.forEach((route) => {
  app.use(route.routes())
    .use(route.allowedMethods());
});


app.listen(port, () => logger.log(`started server at :${port}`));
