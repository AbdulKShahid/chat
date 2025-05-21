const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const initializeSocket = require('./socket'); // 👈 import socket logic

const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const cors = require('cors');

const messagesRouter = require('./routes/messages.js');
const usersRouter = require('./routes/users.js');
const authRouter = require('./routes/auth.js');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: true,
  credentials: true,
  methods: 'POST,GET,PUT,OPTIONS,DELETE',
}));

// Routes
app.use('/messages', messagesRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// Server & Socket.IO setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  }
});

// ✅ Delegate socket logic
initializeSocket(io);

// Start server
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
