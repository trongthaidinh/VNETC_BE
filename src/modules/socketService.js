import { Visit } from '~/models/Visit';

let onlineUsers = 0;

export const setupSocketIO = (io) => {
    io.on('connection', (socket) => handleConnection(socket, io));
};

const handleConnection = async (socket, io) => {
    onlineUsers++;
    console.log("New connection established");

    try {
        await updateVisitCount();
        emitStats(io);

        socket.on('disconnect', () => handleDisconnect(io));
    } catch (error) {
        console.error("Error handling Socket.IO connection:", error);
    }
};

const handleDisconnect = (io) => {
    onlineUsers--;
    emitStats(io);
};

const updateVisitCount = async () => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to the beginning of the day

        let visit = await Visit.findOne({ date: today });
        if (!visit) {
            visit = new Visit({ date: today, dailyCount: 1, totalCount: 1 });
        } else {
            visit.dailyCount++;
            visit.totalCount++;
        }

        await visit.save();
        return visit;
    } catch (error) {
        console.error("Error updating visit count:", error);
        throw error;
    }
};

const emitStats = async (io) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        const visit = await Visit.findOne({ date: today });
        const dailyVisits = visit ? visit.dailyCount : 0;
        const totalVisits = visit ? visit.totalCount : 0;

        io.emit('stats', { online: onlineUsers, daily: dailyVisits, total: totalVisits });
    } catch (error) {
        console.error("Error emitting stats:", error);
    }
};
