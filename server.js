import express from 'express';
import serversConfig from './app/config/servers';

let app = express();
app.set('port', (process.env.PORT || 5000));

app.get('/', (request, response) => {
	response.status(200).json({
		success: true
	});
});

serversConfig(app);