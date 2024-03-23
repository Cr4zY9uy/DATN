import mongoose from "mongoose";
const order_schema = new mongoose.Schema({
    order_id: {
        type: String,
        require: true
    },
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
    country: {
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
                type: String,
                require: true
            },
            title: {
                type: String,
                require: true
            },
            price: {
                type: Number,
                min: 1,
                require: true
            },
            quantity: {
                type: Number,
                min: 0,
                require: true
            },
            thumbnail: {
                type: String,
                require: true
            },
            price_promotion: {
                type: Number,
                min: 0,
                max: 1,
                require: true
            },
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
    discount: {
        type: Number,
        min: 0,
        max: 1,
        default: 0,
    },
    other_fee: {
        type: Number,
        default: 0,
        min: 0,
    },
    received: {
        type: Number,
        min: 0,
        default: 0,
    },
    balance: {
        type: Number,
        default: 0,
        min: 0,
    },
    note: String
},
    {
        timestamps: true
    })
export default mongoose.model("orders", order_schema);