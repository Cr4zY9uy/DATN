import mongoose from "mongoose";
import moongosePaginate from 'mongoose-paginate-v2'

const user_schema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 50,
        trim: true
    },
    email: {
        type: String,
        require: true,
        min: 6,
        max: 50,
        trim: true
    },
    address: {
        type: String,
        min: 3,
        max: 150,
        trim: true
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max: 50,
        trim: true
    },
    gender: {
        type: String,
        require: true,
        enum: ["female", "male", "other"],
        default: "other",
        trim: true
    },
    role: {
        type: Number,
        enum: [0, 1, 2, 3],
        default: 0,
    },
    name: {
        type: String,
        require: true,
        min: 6,
        max: 50,
        trim: true
    },
    phone: {
        type: String,
        min: 10,
        max: 13,
        trim: true
    },
    googleID: {
        type: String,
    },
    refreshToken: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    isLocked: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    })

user_schema.plugin(moongosePaginate)
export default mongoose.model("users", user_schema);

