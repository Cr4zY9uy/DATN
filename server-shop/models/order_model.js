import mongoose from "mongoose";
import moongosePaginate from 'mongoose-paginate-v2'

const order_schema = new mongoose.Schema({
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
    paymentMethod: {
        type: String,
        enum: ['Credit card', 'Paypal', 'COD'],
        require: true
    },
    shippingMethod: {
        type: String,
        enum: ['Express', 'Free', 'Standard'],
        require: true
    },
    paymentStatus: {
        type: String,
        enum: ['Unpaid', 'Partial payment', 'Paid', 'Return'],
        default: 'Unpaid',
    },
    shippingStatus: {
        type: String,
        enum: ['Not sent', 'Sending', 'Shipping done'],
        default: 'Not sent',
    },
    orderStatus: {
        type: String,
        enum: ['New', 'Processing', 'Hold', 'Canceled', 'Done', 'Failed'],
        default: 'New',
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
            subPrice: {
                type: Number,
                min: 1000,
                require: true
            },
            quantity: {
                type: Number,
                min: 0,
                require: true
            },
            images: [{
                type: String,
                require: true
            }],

        }
    ],
    tax: {
        type: Number,
        min: 0,
        max: 1,
        default: 0.09
    },
    shippingCost: {
        type: Number,
        min: 0,
    },
    total: {
        type: Number,
        min: 0,
        default: 0,
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