import http from 'http';
import winston from 'winston';
import socketIO from 'socket.io';
import * as mainConstants from '../../constants/main';
import colors from 'colors/safe';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import * as utils from '../../modules/utils';

export default (app) => {
	let server = http.createServer(app);
	let io = socketIO.listen(server);

	app.use(compression());
	app.use(helmet());
	app.use(cors());

	server.listen(app.get('port'), mainConstants.MAIN.SERVER_HTTP_IP, () => {
		winston.log('info', colors.magenta('HTTP Server:'), colors.cyan(`Listering on ${mainConstants.MAIN.SERVER_HTTP_IP}:${mainConstants.MAIN.SERVER_HTTP_PORT}`));
	});

	io.httpServer.on('listening', () => {
		winston.log('info', colors.red('IO Server:'), colors.cyan(`Listering on ${mainConstants.MAIN.SERVER_HTTP_IP}:${mainConstants.MAIN.SERVER_HTTP_PORT}`));
	});

	io.on('connection', (client) => {
		winston.log('info', colors.red('IO Server:'), colors.cyan('New client connected'));

		client.on('message', (message) => {
			winston.log('info', colors.red('IO Server:'), colors.cyan(`New message from client: ${JSON.stringify(message)}`));

			if (utils.notEmpty(message.nickname) && utils.notEmpty(message.message) && utils.notEmpty(message.color)) {
				io.emit('server-message', message);
			}
		});
	});
};