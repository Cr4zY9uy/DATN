import mongoose from "mongoose";
import moongosePaginate from 'mongoose-paginate-v2'

const product_schema = new mongoose.Schema({
    name: {
        type: String,
        requiredd: true,
        min: 3,
        max: 50,
        trim: true
    },
    description: {
        required: true,
        type: String,
        min: 5,
        max: 300
    },
    unit: {
        type: String,
        min: 5,
        max: 20,
        required: true,
    },
    origin: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        min: 1,
        requiredd: true
    },
    quantity: {
        sold: {
            type: Number,
            min: 0,
            default: 0
        },
        inTrade: {
            type: Number,
            min: 0,
            default: 0
        },
        unSold: {
            type: Number,
            min: 0,
            default: 0
        }
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        requiredd: true,
    },
    images: [{
        type: String,
        requiredd: true
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    ratingId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating",
    }],
    saleId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sale",
    }]
}
    ,
    {
        timestamps: true
    })

product_schema.plugin(moongosePaginate)
export default mongoose.model("Product", product_schema);