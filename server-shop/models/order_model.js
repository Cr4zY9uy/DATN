import mongoose from "mongoose";
const order_schema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    payment_method: {
        type: String,
        enum: ['Credit card', 'Paypal', 'COD'],
        require: true
    },
    shipping_method: {
        type: String,
        enum: ['Express', 'Free', 'Standard'],
        require: true
    },
    payment_status: {
        type: String,
        enum: ['Unpaid', 'Partial payment', 'Paid', 'Return'],
        default: 'Unpaid',
    },
    shipping_status: {
        type: String,
        enum: ['Not sent', 'Sending', 'Shipping done'],
        default: 'Not sent',
    },
    order_status: {
        type: String,
        enum: ['New', 'Processing', 'Hold', 'Canceled', 'Done', 'Failed'],
        default: 'New',
    },
    products: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                require: true
            },
            name: {
                type: String,
                require: true,
                min: 3,
                max: 50,
                trim: true
            },
            price: {
                type: Number,
                min: 10000,
                max: 30000000,
                require: true
            },
            quantity: {
                type: Number,
                min: 0,
                require: true
            },
            thumbnail: [{
                type: String,
                require: true
            }],
            tax: {
                type: Number,
                min: 0,
                max: 1,
                require: true
            },
        }
    ],
    shipping_cost: {
        type: Number,
        min: 0,
    },
    received: {
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
export default mongoose.model("orders", order_schema);