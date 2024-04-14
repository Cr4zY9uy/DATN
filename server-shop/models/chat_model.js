import mongoose from "mongoose"
import moongosePaginate from 'mongoose-paginate-v2'

const chat_schema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true,
    },
    message: [{
        sender: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                require: true
            },
            role: {
                type: Number,
                require: true
            }
        },
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
    }]
}, { timestamps: true })

export default mongoose.model('chats', chat_schema)