// Arquivo principal da aplicação

// 'require' vai na none_modules e pega a lib express
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors'); // Indica quem pode acessar

const app = express();
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

// Conectando o usúario numa sala única
io.on('connection', socket => {
	socket.on('connectRoom', box => {
		socket.join(box);
	});
});

mongoose.connect(
	'mongodb+srv://omnistack:omnistack@cluster0-7ejld.mongodb.net/test?retryWrites=true',
	{
		useNewUrlParser: true
	}
);

app.use((req, res, next) => {
	req.io = io;

	return next();
});

// Cadastrando um módulo no express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(3333);
