import mongoose from "mongoose";

const favourite_schema = new mongoose.Schema({
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
            rating: {
                ratingId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Rating',
                    require: true
                },
                star:{
                    type: Number,
                    require: true,
                    min: 0
                }
            },
            isActive: {
                type: Boolean,
                default: true
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
export default mongoose.model("Favourite", favourite_schema);