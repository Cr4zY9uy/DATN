import mongoose from "mongoose";
const comment_schema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 6,
        max: 50,
        trim: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    price: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'prices',
        }
    ]
},
    {
        timestamps: true
    })
export default mongoose.model("comments", comment_schema);