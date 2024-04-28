import mongoose from "mongoose";
import moongosePaginate from 'mongoose-paginate-v2'

const blog_schema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        min: 6,
        trim: true,
        unique: true
    },
    user: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        firstName: {
            type: String,
            require: true,
            min: 6,
            max: 50,
            trim: true
        },
        lastName: {
            type: String,
            require: true,
            min: 6,
            max: 50,
            trim: true
        },
    },
    content: {
        type: String,
        required: true,
        trim: true,
        min: 20,
    },
    order: {
        type: Number,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    })

blog_schema.plugin(moongosePaginate)
export default mongoose.model("Blog", blog_schema);