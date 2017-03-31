'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _main = require('../../constants/main');

var mainConstants = _interopRequireWildcard(_main);

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _utils = require('../../modules/utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
	var server = _http2.default.createServer(app);
	var io = _socket2.default.listen(server);

	app.use((0, _compression2.default)());
	app.use((0, _helmet2.default)());
	app.use((0, _cors2.default)());

	server.listen(app.get('port'), mainConstants.MAIN.SERVER_HTTP_IP, function () {
		_winston2.default.log('info', _safe2.default.magenta('HTTP Server:'), _safe2.default.cyan('Listering on ' + mainConstants.MAIN.SERVER_HTTP_IP + ':' + mainConstants.MAIN.SERVER_HTTP_PORT));
	});

	io.httpServer.on('listening', function () {
		_winston2.default.log('info', _safe2.default.red('IO Server:'), _safe2.default.cyan('Listering on ' + mainConstants.MAIN.SERVER_HTTP_IP + ':' + mainConstants.MAIN.SERVER_HTTP_PORT));
	});

	io.on('connection', function (client) {
		_winston2.default.log('info', _safe2.default.red('IO Server:'), _safe2.default.cyan('New client connected'));

		client.on('message', function (message) {
			_winston2.default.log('info', _safe2.default.red('IO Server:'), _safe2.default.cyan('New message from client: ' + JSON.stringify(message)));

			if (utils.notEmpty(message.nickname) && utils.notEmpty(message.message) && utils.notEmpty(message.color)) {
				io.emit('server-message', message);
			}
		});
	});
};