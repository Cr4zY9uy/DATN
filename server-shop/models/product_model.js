import mongoose from "mongoose";
import moongosePaginate from 'mongoose-paginate-v2'

const product_schema = new mongoose.Schema({
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
    origin: {
        type: String,
        require: true,
        trim: true
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
    category: {
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            require: true,
        },
        name: {
            type: String,
            require: true,
            min: 5,
            max: 50
        }
    },
    images: [{
        type: String,
        require: true
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    variant: [
        {
            variantId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Variant',
                require: true
            },
            price: {
                type: Number,
                require: true
            },
            name: {
                type: String,
                require: true
            }
        }
    ]
}
    ,
    {
        timestamps: true
    })

product_schema.plugin(moongosePaginate)
export default mongoose.model("Product", product_schema);