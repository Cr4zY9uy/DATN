import mongoose from "mongoose"

const chat_schema = new mongoose.Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    }],
    messages: [{
        isRead: {
            type: Boolean,
            default: false,
        },
        content: {
            type: String,
            required: true,
        },
        day: {
            type: Date,
            default: new Date(),
        }
    }],
    link: {
        type: String,
    },
}, { timestamps: true })
export default mongoose.model('chats', chat_schema)