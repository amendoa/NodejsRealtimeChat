import express from 'express';
import serversConfig from './app/config/servers';

let app = express();

serversConfig(app);