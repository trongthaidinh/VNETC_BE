import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';
import { env } from './config/environment';
import initApis from './routes/api';
import { setupSocketIO } from './modules/socketService';
import { connectToDatabase } from './config/mongodb';
import { errorHandlingMiddleWare } from '~/middlewares/errorHandlingMiddleWare';
import helmet from 'helmet';
import path from 'path'; // Import path module

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
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
app.use(helmet());

// Database connection
connectToDatabase();

// Socket.IO setup
setupSocketIO(io);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put API routes here (if any)
initApis(app);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Error handling middleware
app.use(errorHandlingMiddleWare);

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});

// Start server
const startServer = () => {
    server.listen(env.PORT, () => {
        console.log(`Server running at: http://localhost:${env.PORT}/`);
    });
}

startServer();
