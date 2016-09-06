const http = require('http');
const parseUrl = require('url').parse;
const controllers = require('./controllers');
const authorize = require('./middlewares/authorize');

function notFoundController(req, res) {
	res.end('404');
}

const routes = [
	{
		path      : '/',
		controller: controllers.home
	},
	{
		path      : '/user',
		controller: controllers.user.user
	},
	{
		path      : '/my/avatar',
		controller: controllers.user.myAvatar
	},
	{
		path      : '/auth/register',
		controller: controllers.auth.register
	},
	{
		path      : '/auth/login',
		controller: controllers.auth.login
	},
	{
		path      : /^\/static(\/.*)/,
		controller: controllers.static.static
	},
	{
		path      : /^\/upload(\/.*)/,
		controller: controllers.static.upload
	}
];

function find(routes, match) {
	for (var route of routes) {
		if (match(route)) {
			return route;
		}
	}
}

var server = http.createServer(function (req, res) {
	var urlInfo = parseUrl(req.url);
	var route = find(routes, function (route) {
		if (route.path instanceof RegExp) {
			var info = urlInfo.pathname.match(route.path);
			req.params = info;
			return info;
		}
		return route.path === urlInfo.pathname;
	});
	var controller = route && route.controller || notFoundController;
	authorize(controller)(req, res);
});

server.listen(3000);
