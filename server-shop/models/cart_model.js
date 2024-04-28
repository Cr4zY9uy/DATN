import mongoose from "mongoose";
const cart_schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                require: true
            },
            name: {
                type: String,
                require: true,
                min: 3,
                max: 50,
                trim: true
            },
            quantity: {
                type: Number,
                min: 0,
                require: true
            },
            variant:
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
                    require: true,
                    min: 3
                }
            },
            images: [{
                type: String,
                require: true
            }],
        }
    ]
},
    {
        timestamps: true
    })
export default mongoose.model("Cart", cart_schema);