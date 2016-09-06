const cookies = require('../utils/cookies');
const send = require('../utils/send');
const models = require('../models');

function getLoginUserId(req, callback) {
	var c = cookies.parse(req.headers.cookie || '');
	if (!c.token) {
		callback();
		return;
	}
	models.token.get(c.token, callback);
}

module.exports = function authorize(controller) {
	return function (req, res) {
		getLoginUserId(req, function(err, userId) {
			if(err) {
				send.sendError(err, res);
				return;
			}
			req.userId = userId;
			controller(req, res);
		});
	}
}