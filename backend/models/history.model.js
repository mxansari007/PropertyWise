import mongoose, { Schema } from 'mongoose';

const historySchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming there's a User model
        required: true,
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true,
    },
    action: { 
        type: String, 
        enum: ['viewed', 'booked'], // You can extend this with other actions
        required: true 
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const History = mongoose.model('History', historySchema);
export default History;
