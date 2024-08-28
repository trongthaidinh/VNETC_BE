import { Visit } from '~/models/Visit';

export const setupSocketIO = (io) => {
    io.on('connection', (socket) => handleConnection(socket, io));
};

const handleConnection = async (socket, io) => {
    console.log("New connection established");

    try {
        const { daily, total } = await updateVisitCount();
        emitStats(io, daily, total);

        socket.on('disconnect', () => handleDisconnect(io));
    } catch (error) {
        console.error("Error handling Socket.IO connection:", error);
    }
};

const handleDisconnect = (io) => {
    emitStats(io);
};

const updateVisitCount = async () => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let todayVisit = await Visit.findOne({ date: today });
        if (!todayVisit) {
            todayVisit = new Visit({ date: today, count: 1 });
        } else {
            todayVisit.count++;
        }
        await todayVisit.save();

        const totalVisits = await Visit.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$count" }
                }
            }
        ]);

        const total = totalVisits.length > 0 ? totalVisits[0].total : todayVisit.count;

        return { daily: todayVisit.count, total };
    } catch (error) {
        console.error("Error updating visit count:", error);
        throw error; 
    }
};

const emitStats = async (io, daily = null, total = null) => {
    try {
        if (daily === null || total === null) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const todayVisit = await Visit.findOne({ date: today });
            daily = todayVisit ? todayVisit.count : 0;

            const totalVisits = await Visit.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$count" }
                    }
                }
            ]);

            total = totalVisits.length > 0 ? totalVisits[0].total : daily;
        }
        io.emit('stats', { daily, total });
    } catch (error) {
        console.error("Error emitting stats:", error);
    }
};
