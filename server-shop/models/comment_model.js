import mongoose from "mongoose";
import moongosePaginate from 'mongoose-paginate-v2'

const comment_schema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        min: 3,
        max: 150,
        trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    })

comment_schema.plugin(moongosePaginate)
export default mongoose.model("Comment", comment_schema);