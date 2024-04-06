import mongoose from "mongoose";
const category_schema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 6,
        max: 50,
        trim: true,
    },
    image: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true,
        min: 6,
        max: 300,
        trim: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        require: true
    }
},
    {
        timestamps: true
    })
export default mongoose.model("categories", category_schema);