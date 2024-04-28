import mongoose from 'mongoose';

const notification_schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            min: 3,
            trim: true
        },
        message: {
            type: String,
            required: true,
            trim: true,
            min: 3
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            enum: [0, 1, 2, 3],
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true },
);

export default mongoose.model('Notification', notification_schema);