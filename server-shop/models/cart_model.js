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
            quantity: {
                type: Number,
                min: 1,
                require: true
            },
        }
    ]
},
    {
        timestamps: true
    })
export default mongoose.model("Cart", cart_schema);