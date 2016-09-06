const joinPath = require('path').join;
const sendFile = require('../utils/send').sendFile;
const publicPath = '../public';

module.exports = function (req, res) {
	var path = joinPath(__dirname, publicPath, req.params[1]);
	sendFile(path, res);
}