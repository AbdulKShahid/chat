const { sendMessage } = require("./controllers/messages");

// socket.js
module.exports = function initializeSocket(io) {
    io.on('connection', (socket) => {
      console.log('Socket connected:', socket.id);
  
      socket.on('send-message', async (data) => {
        const newMessage = await sendMessage(data);

        io.emit('receive-message', newMessage); // broadcast to all clients
    });
  
      socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
      });
    });
  };
  