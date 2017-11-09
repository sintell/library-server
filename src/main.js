import Koa from 'koa';

const app = new Koa();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`started server at :${PORT}`));
