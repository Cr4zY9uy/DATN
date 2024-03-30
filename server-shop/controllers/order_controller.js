import order_model from "../models/order_model.js"

export const add_order = async (req, res) => {
    const data = req.body;
    try {
        const checkExistId = await order_model.findOne({ order_id: data.order_id });
        if (checkExistId != null) {
            return res.status(400).json({ messsage: "Order id is existed" });
        }
        const order = new order_model(data);
        await order.save();
        return res.status(201).json({ message: "Done" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const edit_order = async (req, res) => {
    const order_id = req.params.id;
    const data = req.body;
    try {

        const find = await order_model.findOne({ order_id: order_id });
        if (find === null) {
            return res.status(404).json({ message: "Order no exists" });
        }
        else {
            const update_order = await order_model.findOneAndUpdate(
                {
                    order_id: order_id
                },
                {
                    payment_method: data.payment_method,
                    shipping_method: data.shipping_method,
                    payment_status: data.payment_status,
                    shipping_status: data.shipping_status,
                    order_status: data.order_status,
                    shipping_cost: data.shipping_cost,
                    discount: data.discount,
                    other_fee: data.other_fee,
                    received: data.received,
                    note: data.note
                },
                {
                    new: true
                }
            );
            await update_order.save();
            return res.status(200).json({ update_order });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const detail_order = async (req, res) => {
    const order_id = req.params.id;
    try {
        const data = await order_model.findOne({ order_id: order_id })
        if (data === null) {
            return res.status(404).json({ message: "Order no exists" });
        }
        else {
            const order = {
                order_id: order_id,
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
                email: data.email,
                address: data.address,
                country: data.country,
                payment_method: data.payment_method,
                shipping_method: data.shipping_method,
                payment_status: data.payment_status,
                shipping_status: data.shipping_status,
                order_status: data.order_status,
                products: data.products,
                shipping_cost: data.shipping_cost,
                discount: data.discount,
                other_fee: data.other_fee,
                received: data.received,
                note: data.note,
                balance: data.balance,
                createdAt: data.createdAt
            };
            return res.status(200).json({ order });

        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const delete_order_one = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await order_model.findOneAndDelete({ order_id: id });
        if (data) {
            return res.status(200).json({ message: "Order deleted successfully" });
        } else {
            return res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const delete_order_all = async (req, res) => {
    try {
        const data = await order_model.deleteMany({ _id: { $ne: null } });
        if (data) {
            return res.status(200).json({ message: "Order deleted successfully" });
        } else {
            return res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const delete_order_list = async (req, res) => {
    try {
        const order_id = req.body.order_id;
        if (!order_id || order_id.length === 0) {
            return res.status(400).json({ message: "Please provide list of order_id" });
        }
        const data = await order_model.deleteMany({ order_id: { $in: order_id } });

        if (data) {
            return res.status(200).json({ message: "Orders deleted successfully" });
        } else {
            return res.status(404).json({ message: "Orders not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const paginate_order = async (req, res) => {
    const limit = 9;
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * limit;
    try {
        const dataAll = await order_model.find().sort({ createdAt: -1 });
        const data = dataAll.slice(skip, skip + limit);
        if (data.length === 0) {
            return res.status(404).json({ message: "No order" });
        }
        const total_page = Math.ceil(dataAll.length / limit);
        const order_list = data.map((order) => ({
            order_id: order.order_id,
            first_name: order.first_name,
            last_name: order.last_name,
            phone: order.phone,
            email: order.email,
            address: order.address,
            country: order.country,
            payment_method: order.payment_method,
            shipping_method: order.shipping_method,
            payment_status: order.payment_status,
            shipping_status: order.shipping_status,
            order_status: order.order_status,
            products: order.products,
            shipping_cost: order.shipping_cost,
            discount: order.discount,
            other_fee: order.other_fee,
            received: order.received,
            balance: order.balance,
            note: order.note,
            createdAt: order.createdAt
        }));
        return res.status(200).json({ order_list, total_page: total_page, total_order: dataAll.length, page: page });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const all_order = async (req, res) => {

    try {
        const data = await order_model.find().sort({ createdAt: -1 });
        if (data.length === 0) {
            return res.status(404).json({ message: "No order" });
        }
        else {
            const order_list = data.map((order) => ({
                order_id: order.order_id,
                first_name: order.first_name,
                last_name: order.last_name,
                phone: order.phone,
                email: order.email,
                address: order.address,
                country: order.country,
                payment_method: order.payment_method,
                shipping_method: order.shipping_method,
                payment_status: order.payment_status,
                shipping_status: order.shipping_status,
                order_status: order.order_status,
                products: order.products,
                shipping_cost: order.shipping_cost,
                discount: order.discount,
                other_fee: order.other_fee,
                received: order.received,
                balance: order.balance,
                note: order.note,
                createdAt: order.createdAt
            }));
            return res.status(200).json({ order_list });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}