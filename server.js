import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';
import { env } from './src/config/environment.js';
import initApis from './src/routes/api.js';
import { setupSocketIO } from './src/modules/socketService.js';
import { connectToDatabase } from './src/config/mongodb.js';
import { errorHandlingMiddleWare } from './src/middlewares/errorHandlingMiddleWare.js'; 

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Database connection
connectToDatabase();

// Socket.IO setup
setupSocketIO(io);

// Routes
initApis(app);

// Error handling
app.use(errorHandlingMiddleWare);

// Start server
const startServer = () => {
    server.listen(env.PORT, () => {
        console.log(`Server running at: http://localhost:${env.PORT}/`);
    });
};

startServer();
