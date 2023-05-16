const socketIo = require('socket.io');

function configureSocket(server) {
  const io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected with id ${socket.id}`);
    // Ajouter la gestion des événements ici
    socket.on('message', (message) => {
        console.log(`message from ${socket.id} : ${message}`);
      })
    
    socket.on('disconnect', () => {
    console.log(`socket ${socket.id} disconnected`);
    })
  });
}

module.exports = configureSocket;
