const router = require('koa-router')();
const models = require('../models');

router.get('/', async (ctx) => {
	const userId = ctx.session.userId;
	const user = await models.user.get(userId);
	ctx.body = user || {};
});

module.exports = router;