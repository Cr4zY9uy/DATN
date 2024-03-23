import mongoose from "mongoose";
const category_schema = new mongoose.Schema({
    category_id: {
        type: String,
        require: true,
        min: 4,
        max: 10
    },
    name: {
        type: String,
        require: true,
        min: 6,
        max: 50
    },
    image: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true,
        min: 6,
        max: 300
    }
},
    {
        timestamps: true
    })
export default mongoose.model("categories", category_schema);