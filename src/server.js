import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'
import {env} from './config/environment'
import {errorHandlingMiddleWare} from './middlewares/errorHandlingMiddleWare'
import initApis from './routes/api'

const app = express()
// const server = http.createServer(app, () => {
//     const clientIP = req.connection.remoteAddress;
//     console.log('Client IP:', clientIP);
// })
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*", // Hoặc địa chỉ cụ thể của client
        methods: ["GET", "POST"]
    }
});
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))


mongoose.connect(env.MONGODB_URI)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Connected to MongoDB')
});
const VisitSchema = new mongoose.Schema({
    count: Number
});
const Visit = mongoose.model('Visit', VisitSchema);
let onlineUsers = 0;
io.on('connection', async (socket) => {
    try {
        onlineUsers++;
        console.log("Có kết nối mới");

        let visit = await Visit.findOne();
        if (!visit) {
            visit = new Visit({count: 1});
        } else {
            visit.count++;
        }
        await visit.save();

        io.emit('stats', {online: onlineUsers, total: visit.count});

        socket.on('disconnect', () => {
            onlineUsers--;
            io.emit('stats', {online: onlineUsers, total: visit.count});
        });
    } catch (error) {
        console.error("Lỗi khi xử lý kết nối Socket.IO:", error);
    }
});

// Cho phép lý dữ liệu từ form method POST
app.use(express.urlencoded({extended: true}));

//Khởi tạo các routes
initApis(app)

//middleware error handler
app.use(errorHandlingMiddleWare)


server.listen(env.PORT, () => {
    console.log(`Server running at:${env.PORT}/`)
})