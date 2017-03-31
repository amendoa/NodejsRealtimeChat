import http from 'http';
import winston from 'winston';
import socketIO from 'socket.io';
import * as mainConstants from '../../constants/main';
import colors from 'colors/safe';

export default (app) => {
	let server = http.createServer(app);
	let io = socketIO.listen(server);

	server.listen(mainConstants.MAIN.SERVER_HTTP_PORT, mainConstants.MAIN.SERVER_HTTP_IP, () => {
		winston.log('info', colors.magenta('HTTP Server:'), colors.cyan(`Listering on ${mainConstants.MAIN.SERVER_HTTP_IP}:${mainConstants.MAIN.SERVER_HTTP_PORT}`));
	});

	io.httpServer.on('listening', () => {
		winston.log('info', colors.red('IO Server:'), colors.cyan(`Listering on ${mainConstants.MAIN.SERVER_HTTP_IP}:${mainConstants.MAIN.SERVER_HTTP_PORT}`));
	});
};