import mongoose from "mongoose";
import moongosePaginate from 'mongoose-paginate-v2'

const order_schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    firstNameReceiver: {
        type: String,
        require: true,
        min: 3,
        max: 50,
        trim: true
    },
    lastNameReceiver: {
        type: String,
        require: true,
        min: 3,
        max: 50,
        trim: true
    },
    phoneReceiver: {
        type: String,
        require: true,
        min: 10,
        max: 13,
        trim: true
    },
    emailReceiver: {
        type: String,
        require: true,
        min: 5,
        max: 50,
        trim: true
    },
    addressReceiver: {
        type: String,
        require: true,
        min: 5,
        max: 50,
        trim: true
    },
    countryReceiver: {
        type: String,
        require: true,
        min: 5,
        max: 50,
        trim: true
    },
    paymentMethod: {
        type: String,
        enum: ['vnpay', 'cod'],
        require: true
    },
    shippingMethod: {
        type: String,
        enum: ['express', 'free', 'standard'],
        require: true
    },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'partial_payment', 'paid'],
        default: 'unpaid',
    },
    shippingStatus: {
        type: String,
        enum: ['not_sent', 'sending', 'shipping_done'],
        default: 'not_sent',
    },
    orderStatus: {
        type: String,
        enum: ['new', 'processing', 'hold', 'canceled', 'done'],
        default: 'new',
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                require: true
            },
            subPrice: {
                type: Number,
                min: 1,
                require: true
            },
            quantity: {
                type: Number,
                min: 1,
                require: true
            },
        }
    ],
    tax: {
        type: Number,
        min: 0,
        default: 1
    },
    shippingCost: {
        type: Number,
        min: 0,
        default: 0
    },
    total: {
        type: Number,
        min: 0,
    },
    note: {
        type: String,
        trim: true
    }
},
    {
        timestamps: true
    })


order_schema.plugin(moongosePaginate)
export default mongoose.model("Order", order_schema);