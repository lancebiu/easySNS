const joinPath = require('path').join;
const sendFile = require('../utils/send').sendFile;
const publicPath = '../public';
const uploadPath = '../data/upload';

exports.static = function (req, res) {
	var path = joinPath(__dirname, publicPath, req.params[1]);
	sendFile(path, res);
}

exports.upload = function (req, res) {
	var path = joinPath(__dirname, uploadPath, req.params[1]);
	console.log(path);
	sendFile(path, res);
}