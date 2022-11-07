import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import userController from './controllers/userController.js';
import adminController from './controllers/adminController.js';
import communityController from './controllers/communityController.js';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT ?? 5050;
const socketPort = process.env.SOCKET ?? 5051;
const origin = process.env.ORIGIN ?? 'http://localhost:3000';

const split = string => {
	string = string.split(/\,/);
	return string;
};

const io = new Server(server, {
	cors: {
		origin: split(origin),
		methods: ['GET', 'POST'],
	},
});

io.attach(socketPort);

app.use(cors());
app.use(express.json());
app.use('/storage/users', express.static('storage/users'));
app.use('/storage/communities', express.static('storage/communities'));
app.use(userController);
app.use(adminController);
app.use(communityController);

io.on('connection', socket => {
	socket.on('comunidade-canal-join', data => {
		socket.join(data.canal);
	});

	socket.on('comunidade-canal-send', async data => {
		socket.to(data.canal).emit('comunidade-canal-receive', data);
	});
});

app.listen(port, () => console.log(`Server listening on ${port}`));
console.log(`Socket listening on ${socketPort}`);
