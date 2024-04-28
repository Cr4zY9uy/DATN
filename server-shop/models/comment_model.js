import mongoose from "mongoose";
import moongosePaginate from 'mongoose-paginate-v2'

const comment_schema = new mongoose.Schema({
    content: {
        type: String,
        require: true,
        min: 6,
        max: 50,
        trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
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

comment_schema.plugin(moongosePaginate)
export default mongoose.model("Comment", comment_schema);