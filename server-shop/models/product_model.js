import mongoose from "mongoose";
const product_schema = new mongoose.Schema({
    product_id: {
        type: String,
        require: true,
        min: 5,
        max: 10
    },
    title: {
        type: String,
        require: true,
        min: 3,
        max: 50
    },
    price: {
        type: Number,
        min: 1,
        default: 1,
    },
    description: {
        type: String,
        min: 5,
        max: 300
    },
    qty: {
        type: Number,
        min: 0,
        require: true
    },
    category_name: {
        type: String,
        require: true,
        min: 5,
        max: 50
    },
    thumbnail: {
        type: String,
        require: true
    },
    price_promotion: {
        type: Number,
        min: 0,
        max: 1,
        require: true
    },
    status: {
        type: Number,
        enum: [0, 1],
        default: 0
    }
}
    ,
    {
        timestamps: true
    })
export default mongoose.model("products", product_schema);