const getRawbody = require('../utils/getRawBody');
const qs = require('querystring');

module.exports = function (req, callback) {
	getRawbody(req, function (err, rawBody) {
		if(err) {
			callback(err);
			return;
		}

		var type = req.headers['content-type'] ||  '';
		type = type.split(';')[0];
		if (type == 'application/x-www-form-urlencoded') {
			var body = qs.parse(rawBody);
			callback(null, body);
		}
	})
}