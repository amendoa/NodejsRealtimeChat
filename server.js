'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _servers = require('./app/config/servers');

var _servers2 = _interopRequireDefault(_servers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.set('port', process.env.PORT || 5000);

app.get('/', function (request, response) {
	response.status(200).json({
		success: true
	});
});

(0, _servers2.default)(app);