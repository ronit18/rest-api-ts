import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose, { mongo } from 'mongoose';
dotenv.config();

const MONGO_URL = process.env.MONGO_URL!;

const app = express();
app.use(
	cors({
		credentials: true,
	})
);
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

const server = http.createServer(app);

server.listen(8080, () => {
	console.log('server is running on http://localhost:8080/');
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.error(error));
