import mongoose from "mongoose";
const favourite_schema = new mongoose.Schema({
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
            stars: {
                type: Number,
                require: true,
                min: 0
            },
            price: {
                type: Number,
                require: true,
                min: 10000
            },
            isActive: {
                type: Boolean,
                default: true
            },
            thumbnail: [{
                type: String,
                require: true
            }],
        }
    ]
},
    {
        timestamps: true
    })
export default mongoose.model("favourites", favourite_schema);