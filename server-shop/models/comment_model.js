import mongoose from "mongoose";
const comment_schema = new mongoose.Schema({
    content: {
        type: String,
        require: true,
        min: 6,
        max: 50,
        trim: true,
    },
    stars: {
        type: Number,
        require: true,
        min: 1,
        max: 5,
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
export default mongoose.model("comments", comment_schema);