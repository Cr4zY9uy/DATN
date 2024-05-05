import mongoose from "mongoose";

const favourite_schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ]
},
    {
        timestamps: true
    })
export default mongoose.model("Favourite", favourite_schema);