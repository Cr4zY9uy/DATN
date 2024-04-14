import mongoose from "mongoose";
const banner_schema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        min: 6,
        max: 50,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: 20,
        maxLength: 50
    },
    image: {
        type: String,
        require: true
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
export default mongoose.model("banners", banner_schema);