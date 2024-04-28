import mongoose from "mongoose";
import moongosePaginate from 'mongoose-paginate-v2'

const comment_schema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 6,
        max: 50,
        trim: true,
    },
    isMin: {
        type: Boolean,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    price: {
        type: Number,
        require: true,
        min: 0
    }
},
    {
        timestamps: true
    })

comment_schema.plugin(moongosePaginate)
export default mongoose.model("Comment", comment_schema);