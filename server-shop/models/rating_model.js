import mongoose from "mongoose";
const rating_schema = new mongoose.Schema({
    star: {
        type: Number,
        min: 0,
        max: 5,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
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
export default mongoose.model("ratings", rating_schema);