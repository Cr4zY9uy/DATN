import mongoose from "mongoose";
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
        enum: ["Female", "Male", "Other"],
        default: "Other",
        trim: true
    },
    role: {
        type: Number,
        enum: [0, 1, 2, 3],
        default: 0,
    },
    last_name: {
        type: String,
        require: true,
        min: 6,
        max: 50,
        trim: true
    },
    first_name: {
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
export default mongoose.model("users", user_schema);

