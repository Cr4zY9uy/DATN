import mongoose from "mongoose";
const product_schema = new mongoose.Schema({
    sku_id: {
        type: String,
        require: true,
        min: 5,
        max: 10
    },
    name: {
        type: String,
        require: true,
        min: 3,
        max: 50,
        trim: true
    },
    description: {
        type: String,
        min: 5,
        max: 300
    },
    quantity: {
        type: Number,
        min: 0,
        require: true
    },
    origin: {
        type: String,
        require: true,
        trim: true
    },
    category: {
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "categories",
            require: true,
        },
        category_name: {
            type: String,
            require: true,
            min: 5,
            max: 50
        }
    },
    thumbnail: [{
        type: String,
        require: true
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    variant: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'variants',
    }]
}
    ,
    {
        timestamps: true
    })
export default mongoose.model("products", product_schema);