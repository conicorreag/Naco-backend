const Koa = require('koa');
const KoaLogger = require('koa-logger');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');
const router = require('./routes');
const orm = require('./models');

const app = new Koa();

app.context.orm = orm;

// Cors para poder acceder desde el frontend

app.use(cors());

app.use(KoaLogger());
app.use(koaBody());

app.use(router.routes());

app.use((ctx) => {
  ctx.body = 'Hello world!';
});

module.exports = app;
