var http = require('http');
var parseUrl = require('url').parse;

function homeController(req, res) {
    res.end('home');
}

function userController(req, res) {
    res.end('user');
}

function notFoundController(req, res) {
    res.end('404');
}

const routes = [
    {
        path: '/',
        controller: homeController
    },
    {
        path: '/user',
        controller: userController
    }
];

function find(routes, match) {
    for (var route of routes) {
        if(match(route)) {
            return route;
        }
    }
}

var server = http.createServer(function(req, res){
    var urlInfo = parseUrl(req.url);
    var route = find(routes, function(route){
        return route.path === urlInfo.pathname;
    });
    var controller = route && route.controller || notFoundController;
    controller(req, res);
});

server.listen(3000);
