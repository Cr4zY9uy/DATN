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
    firstName: {
        type: String,
        require: true,
        min: 3,
        max: 50,
        trim: true
    },
    lastName: {
        type: String,
        require: true,
        min: 3,
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
    isActive: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    })

user_schema.plugin(moongosePaginate)
export default mongoose.model("User", user_schema);

