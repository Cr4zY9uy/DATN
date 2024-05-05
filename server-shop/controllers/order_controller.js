import { order_form, order_subject, order_text } from "../form_mail/order_form.js";
import order_model from "../models/order_model.js"
import { sendEmail } from "../nodemailer/nodemailer_config.js";
const from = process.env.NODEMAILER_EMAIL

export const add_order = async (req, res) => {
    const data = req.body;
    const { tax, products } = data
    try {
        const subPriceSumForEachProduct = products.map(product => product.subPrice);
        const totalSubPrice = subPriceSumForEachProduct.reduce((acc, curr) => acc + curr, 0);
        const total = totalSubPrice + parseFloat(tax);
        const order = await order_model.create({ ...data, total: total })
        if (order) {
            const orderCreated = await order_model.findOne({ _id: order._id }).populate({
                path: "products.productId",
                model: "Product",
                select: 'name price images'
            })
            const modifiedData = {
                ...orderCreated._doc,
                products: orderCreated.products.map(product => ({
                    ...product._doc,
                    productId: {
                        ...product.productId._doc,
                        images: product.productId._doc.images[0]
                    }
                }))
            };
            await sendEmail(from, modifiedData.emailReceiver, order_subject, order_text, order_form(modifiedData))
            return res.status(201).json({ order });
        }
        else return res.status(400).json({ message: "Create order not successfully!" })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const edit_order = async (req, res) => {
    const order_id = req.params.id;
    const { paymentStatus, shippingStatus, orderStatus, shippingCost } = req.body;
    const data = {};

    if (paymentStatus) data.paymentStatus = paymentStatus;
    if (shippingStatus) data.shippingStatus = shippingStatus;
    if (orderStatus) data.orderStatus = orderStatus;
    if (shippingCost) data.shippingCost = shippingCost
    try {
        const order = await order_model.findOne({ _id: order_id });
        if (!order) {
            return res.status(404).json({ message: "Order does not exist" });
        }
        const updated_order = await order_model.findOneAndUpdate(
            { _id: order._id },
            data,
            { new: true }
        );
        if (updated_order)
            return res.status(200).json({ ...updated_order._doc });
        return res.status(400).json({ message: "Update unsuccessfully " })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const detail_order = async (req, res) => {
    const order_id = req.params.id;
    try {
        const data = await order_model.findOne({ _id: order_id }).populate({
            path: "products.productId",
            model: "Product",
            select: 'name price images'
        })
        if (!data) {
            return res.status(404).json({ message: "Order no exists" });
        }
        else {
            const modifiedData = {
                ...data._doc,
                products: data.products.map(product => ({
                    ...product._doc,
                    productId: {
                        ...product.productId._doc,
                        images: product.productId._doc.images[0]
                    }
                }))
            };
            return res.status(200).json(modifiedData);

        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const paginate_order = async (req, res) => {
    const { name, orderStatus, paymentStatus, shippingStatus, sortCreated, page } = req.query
    const limit = 6;
    const skip = page ? (page - 1) * limit : 0;
    const query = {};
    if (paymentStatus) query.paymentStatus = paymentStatus;
    if (shippingStatus) query.shippingStatus = shippingStatus;
    if (orderStatus) query.orderStatus = orderStatus;
    const fullNameRegex = new RegExp(name, "i");
    const fullNameQuery = { fullName: fullNameRegex };
    let conditions = [];
    if (name) {
        conditions.push(fullNameQuery);
    }
    if (Object.keys(query).length !== 0) {
        conditions.push(query);
    }
    const finalQuery = { $and: conditions };
    let sortKind = {};
    if (sortCreated) {
        if (sortCreated === 'ascend') {
            sortKind.createdAt = 1;
        } else {
            sortKind.createdAt = -1;
        }
    }

    try {

        const aggregationStages = [
            {
                $addFields: {
                    fullName: { $concat: ["$firstNameReceiver", " ", "$lastNameReceiver"] }
                }
            },
            {
                $match: finalQuery
            },
            {
                $lookup: {
                    from: "Product",
                    localField: "products.productId",
                    foreignField: "_id",
                    as: "products"
                }
            },
            {
                $facet: {
                    paginatedResults: [
                        { $skip: skip },
                        { $limit: limit }
                    ],
                    totalCount: [
                        { $count: "count" }
                    ]
                }
            }
        ];
        if (Object.keys(sortKind).length !== 0) {
            aggregationStages.push({ $sort: sortKind });
        }
        const [{ paginatedResults, totalCount }] = await order_model.aggregate(aggregationStages);

        if (totalCount[0].count === 0) {
            return res.status(404).json({ message: "No order " });
        }

        return res.status(200).json({ paginatedResults, total: totalCount[0].count, page, per_page: limit, skip, page: page ? page : 1 });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}


export const all_order = async (req, res) => {

    try {
        const data = await order_model.find({}).populate({
            path: "products.productId",
            model: "Product",
            select: 'name price images'
        });
        if (data.length === 0) {
            return res.status(404).json({ message: "No order" });
        }
        else {
            return res.status(200).json(data);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const order_by_user = async (req, res) => {
    const userId = req.params.userId
    const { page, sortCreated } = req.query
    const limit = 6;
    const skip = page ? (page - 1) * limit : 0;
    const query = {};
    if (userId) query.userId = userId
    let sortKind = {};
    if (sortCreated) {
        if (sortCreated === 'ascend') {
            sortKind.createdAt = 1;
        } else {
            sortKind.createdAt = -1;
        }
    }
    try {
        const dataAll = await order_model.paginate(query, {
            offset: skip, page: page, limit: limit, sort: sortKind,
            populate: {
                path: "products.productId",
                model: "Product",
                select: 'name price images'
            }
        });
        if (dataAll.totalDocs === 0) {
            return res.status(404).json({ message: "No order" });
        }
        return res.status(200).json({ ...dataAll });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}