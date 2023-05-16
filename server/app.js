require("dotenv").config()

const express = require("express")
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser");

const http = require("http")
const socketio = require("socket.io")
const { socketConfig } = require("./config/socket.config");

const server = http.createServer(app);
const io = socketio(server, socketConfig) 

 // Middleware
 app.use(cors());
 app.use(express.json())
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true}));


 // Initialisation de l'API
 app.get("/", (req, res) => {
    res.json({
        path : "/api",
        version: '1.0.1',
        year : 2023,
        message : "Welcome to Faxdrone API Delivery Drone "
    })
 })

// Importations des routes 
const userRouter = require("./api/users/user.router")
const droneRouter = require("./api/drones/drone.router")
const orderRouter = require("./api/orders/order.router")


// Initialisations des routes
app.use("/api/users", userRouter)
app.use("/api/drones", droneRouter)
app.use("/api/orders", orderRouter)

//Initialisation des Port d'ecoutes
const PORT = process.env.APP_PORT || 5000;
 
// Ecoute d'une connexion Socket.io
io.on('connection', (socket) => {
    console.log('Un client est connecté !');
  
    // Ecoute de l'événement "subscribe"
    socket.on('subscribe', (droneIds) => {
      console.log(`Le client ${socket.id} s'abonne aux signaux des drones ${droneIds}`);
  
      // Ecoute des signaux des drones spécifiés
      droneIds.forEach((droneId) => {
        // On souscrit à l'événement correspondant à l'ID du drone
        socket.on(`drone_signal_${droneId}`, (signal) => {
          console.log(`Signal "${signal}" reçu du drone ${droneId}`);
          if (signal === 'ok') {
            // On peut déclencher une action en réponse au signal "ok"
            // Par exemple, envoyer une notification ou mettre à jour une base de données
          }
        });
      });
    });
  });
  
  //Ajoute au client
//   const socket = io.connect('http://localhost:3000');
//   socket.emit('subscribe', [1, 2, 3]);


server.listen(PORT, () => {
    console.log('====================================');
    console.log(`Server running on port ${PORT}`);
    console.log('====================================');
});
