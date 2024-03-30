import mongoose from "mongoose";
const user_schema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 50
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max: 50
    },
    role: {
        type: Number,
        enum: [0, 1],
        default: 0,
    },
    name: {
        type: String,
        require: true,
        min: 6,
        max: 50
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
    }
},
    {
        timestamps: true
    })
export default mongoose.model("users", user_schema);

