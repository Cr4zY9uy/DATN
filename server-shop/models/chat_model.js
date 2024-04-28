import mongoose from "mongoose"
import moongosePaginate from 'mongoose-paginate-v2'

const chat_schema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    message: [{
        sender: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
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
            trim: true,
            min: 3
        },
        daySending: {
            type: Date,
            default: Date.now(),
        }
    }]
}, { timestamps: true })

chat_schema.plugin(moongosePaginate)
export default mongoose.model('Chat', chat_schema)