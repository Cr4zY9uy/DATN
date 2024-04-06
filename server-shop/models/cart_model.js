import mongoose from "mongoose";
const cart_schema = new mongoose.Schema({
    products: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                require: true
            },
            product_name: {
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
            price: {
                type: Number,
                require: true,
                min: 10000
            },
            image: {

            }
        }
    ]
},
    {
        timestamps: true
    })
export default mongoose.model("cart", cart_schema);