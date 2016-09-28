const router = require('koa-router')();
const Auth = require('./auth');
const User = require('./user');

router.use('/auth', Auth.routes(), Auth.allowedMethods());

router.use('/user', User.routes(), User.allowedMethods());

router.post('my/avatar', require('./upload'));

router.get('/', async(ctx) => {
	const isLogin = !!ctx.session.userId;
	await ctx.render(isLogin ? 'home' : 'welcome');
});

router.post('/test', async(ctx) => {
	ctx.body = {
		foo     : 'bar',
		headers : ctx.headers,
		postBody: ctx.request.body
	}
});

module.exports = router;
