import mongoose from "mongoose";
const consignment_schema = new mongoose.Schema(
    {
        products: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            default: [],
        },
        totalMoney: {
            type: Number,
            required: true,
            min: 10000
        },
        expireDate: {
            type: String,
            require: true,
            trim: true
        },
        isDisable: {
            type: Boolean,
            default: false,
        },

    },
    { timestamps: true }
);

export default mongoose.model("consignments", consignment_schema);