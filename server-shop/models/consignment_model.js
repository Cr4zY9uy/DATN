import mongoose from "mongoose";
import moongosePaginate from 'mongoose-paginate-v2'

const consignment_schema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
                quantity: {
                    type: Number,
                    min: 1,
                    require: true
                },
                importMoney: {
                    type: Number,
                    min: 1,
                    require: true
                },
                expireDate: {
                    type: Date,
                    require: true
                }
            }],
        money: {
            type: Number,
            required: true,
            min: 1
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