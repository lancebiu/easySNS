const send = require('../utils/send');
const models = require('../models');
const multiparty = require('multiparty');
const joinPath = require('path').join;

exports.user = function (req, res) {
	models.user.get(req.userId, function (err, user) {
		if (err) {
			send.sendError(err, res);
			return;
		}
		res.end(JSON.stringify(user));
	});
};

const uploadDir = joinPath(__dirname, '../data/upload');
exports.myAvatar = function (req, res) {
	var form = new multiparty.Form({
		uploadDir: uploadDir
	});
	form.parse(req, function (err, fields, files) {
		if (err) {
			send.sendError(err, res);
			return;
		}
		var newPath = files.file[0].path.replace(uploadDir, '');
		var url = 'http://localhost:3000/upload' + newPath;
		models.user.updatePart(req.userId, {avatar: url}, function (err, info) {
			if (err) {
				send.sendError(err, res);
				return;
			}
			res.end(JSON.stringify({
				avatar: url
			}));
		});
	});
};