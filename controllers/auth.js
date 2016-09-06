const crypto = require('crypto');
const parseBody = require('../utils/parseBody');
const redirect = require('../utils/send').redirect;
const sendError = require('../utils/send').sendError;
const models = require('../models');

function generateToken(userId, callback) {
	var token = crypto.randomBytes(16).toString('hex');
	models.token.update(token, userId, function(err) {
		if(err) {
			callback(err);
			return;
		}
		callback(null, token);
	});
}

function doLogin(userId, res) {
	generateToken(userId, function(err, token) {
		res.writeHead(302, {
			location: '/',
			'Set-Cookie': `token=${token}; Path=/; HttpOnly`
		});
		res.end();
	});
}

exports.register = function (req, res) {
	parseBody(req, function (err, body) {
		if (err) {
			sendError(err, res);
			return;
		}
		var user = {
			email   : body.email,
			nickname: body.nickname,
			password: body.password
		};
		models.user.create(user, function (err) {
			if (err) {
				sendError(err, res);
				return;
			}
			doLogin(user.id, res);
		});
	});
}

exports.login = function (req, res) {
	parseBody(req, function (err, body) {
		if (err) {
			sendError(err, res);
			return;
		}
		models.user.getByEmail(body.email, function(err, user) {
			if(err) {
				sendError(err, res);
				return;
			}
			if(!user) {
				redirect('/?err=no_user', res);
				return;
			}
			if(body.password !== user.password) {
				redirect('/?err=invalid_pass', res);
			}
			doLogin(user.id, res);
		});
	});
}