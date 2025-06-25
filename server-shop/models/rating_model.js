import mongoose from "mongoose";
import moongosePaginate from 'mongoose-paginate-v2'

const rating_schema = new mongoose.Schema({
    stars: {
        type: Number,
        min: 0,
        max: 5,
        required: true
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
rating_schema.plugin(moongosePaginate)

export default mongoose.model("Rating", rating_schema);