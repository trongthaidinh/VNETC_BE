import mongoose from 'mongoose';

const VisitSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },  
    dailyCount: { type: Number, default: 0 },  
    totalCount: { type: Number, default: 0 }   
});

export const Visit = mongoose.model('Visit', VisitSchema);
