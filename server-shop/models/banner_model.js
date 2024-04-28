import mongoose from "mongoose";
import moongosePaginate from 'mongoose-paginate-v2'

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
        min: 20,
        max: 50
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

banner_schema.plugin(moongosePaginate)
export default mongoose.model("Banner", banner_schema);