import mongoose from "mongoose";
const blog_schema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        min: 6,
        max: 50,
        trim: true,
        unique: true
    },
    user: {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            require: true
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
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minLength: 20,
    },
    image: {
        type: String,
        require: true
    },
    order: {
        type: Number,
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
export default mongoose.model("blogs", blog_schema);