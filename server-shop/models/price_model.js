import mongoose from "mongoose";
const price_schema = new mongoose.Schema({
    price: {
        type: Number,
        min: 10000,
        max: 30000000,
        require: true
    },
    apply_date: {
        type: Date,
        require: true
    },
    due_date: {
        type: Date,
    },
    isActive: {
        type: Boolean,
        default: true
    }
}
    ,
    {
        timestamps: true
    })
export default mongoose.model("prices", price_schema);