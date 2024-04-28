import mongoose from "mongoose";
import moongosePaginate from 'mongoose-paginate-v2'

const consignment_schema = new mongoose.Schema(
    {
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
                quantity: {
                    type: Number,
                    min: 0,
                    require: true
                },
                expireDate: {
                    type: Date,
                    require: true
                }
            }],
        noney: {
            type: Number,
            required: true,
            min: 1000
        },
        importDate: {
            type: Date,
            require: true,
            trim: true
        }
    },
    { timestamps: true }
);

consignment_schema.plugin(moongosePaginate)
export default mongoose.model("Consignment", consignment_schema);