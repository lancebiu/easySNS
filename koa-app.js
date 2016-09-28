const Koa = require('koa');
const app = new Koa();
const path = require('path');
const views = require('koa-views');
const mount = require('koa-mount');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const session = require('koa-generic-session');
const redisSessionStore = require('koa-redis');
const logger = require('koa-logger');
const convert = require('koa-convert');
const serveStatic = require('koa-static');

const router = require('./routes');

app.keys = ['ew1Qsa'];
// middlewares
app.use(logger());

// logger
app.use(async(ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(mount('/static', convert(serveStatic(path.join(__dirname, 'public')))));
app.use(mount('/upload', convert(serveStatic(path.join(__dirname, 'data/upload')))));
app.use(bodyParser());
app.use(json());

app.use(session({
	store: redisSessionStore({
		// options
	})
}));

app.use(views(path.join(__dirname, 'views'), {
	extension: 'html'
}));

app.use(router.routes(), router.allowedMethods());

app.on('error', (err, ctx) => {
	console.log(err);
	logger.error('server error', err, ctx);
});

app.listen(3000, () => {
	console.log('Server listening at port 3000...');
});