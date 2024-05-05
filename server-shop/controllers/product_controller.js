// import { upload_image } from "../cloudinary/upload_image.js";
import product_model from "../models/product_model.js"
import { options } from "../paginate/options.js";

export const add_product = async (req, res) => {
    try {
        const data = req.body;
        const checkExistName = await product_model.findOne({ name: { $regex: new RegExp(data.name, 'i') } });
        if (checkExistName) {
            return res.status(400).json({ message: "Product name is existed" });
        }
        const product = await product_model.create(data);
        if (product) {
            return res.status(201).json({ product, message: "Add a product successfully" });
        }
        else {
            return res.status(400).json({ message: error.message });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const edit_product = async (req, res) => {
    const product_id = req.params.id;
    console.log(product_id);
    const { name, images, categoryId, quantity, origin, description, isActive } = req.body;
    const data = {};
    if (name) data.name = name;
    if (description) data.description = description;
    if (isActive !== '') data.isActive = isActive;
    if (images) data.images = images
    if (categoryId) data.categoryId = categoryId
    if (quantity) data.quantity = quantity
    if (origin) data.origin = origin
    try {
        console.log(data);
        const product = await product_model.findOne({ _id: product_id });
        if (!product) {
            return res.status(404).json({ message: "Product does not exist" });
        }
        if (data.name) {
            const checkExistName = await product_model.findOne({ name: { $regex: new RegExp(data.name, 'i') } });
            if (checkExistName) {
                return res.status(400).json({ message: "Product name is existed" });
            }
        }

        const updated_product = await product_model.findOneAndUpdate(
            { _id: product_id },
            data,
            { new: true }
        );
        if (updated_product)
            return res.status(200).json({ ...updated_product._doc });
        return res.status(400).json({ message: "Update unsuccessfully " })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const detail_product = async (req, res) => {
    const product_id = req.params.id;
    console.log(product_id);
    try {
        const product = await product_model.findOne({ _id: product_id })
            // .populate({
            //     path: 'ratingId',
            //     model: "Rating"
            // })
            // .populate({
            //     path: 'saleId',
            //     model: "Sale"
            // })
            .populate('categoryId')
        if (!product) {
            return res.status(404).json({ message: "Product no exists" });
        }
        else {

            return res.status(200).json({ ...product._doc });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const delete_product_one = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await product_model.findOneAndDelete({ product_id: id });
        if (data) {
            return res.status(200).json({ message: "Product deleted successfully" });
        } else {
            return res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export const delete_product_all = async (req, res) => {
    try {
        const data = await product_model.deleteMany({ _id: { $ne: null } });
        if (data) {
            return res.status(200).json({ message: "Product deleted successfully" });
        } else {
            return res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const delete_product_list = async (req, res) => {
    try {
        const product_id = req.body.product_id;
        if (!product_id || product_id.length === 0) {
            return res.status(400).json({ message: "Please provide list of product_id" });
        }
        const data = await product_model.deleteMany({ product_id: { $in: product_id } });

        if (data) {
            return res.status(200).json({ message: "Categories deleted successfully" });
        } else {
            return res.status(404).json({ message: "Categories not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const paginate_product = async (req, res) => {
    const { name, origin, categoryId, sortName, page, start_price, end_price, sortPrice, sortDate } = req.query;
    const limit = 6;
    const skip = (page - 1) * limit;
    const query = {};
    if (name) query.name = new RegExp(name, 'i');
    if (origin) query.origin = new RegExp(origin, 'i');
    if (categoryId) {
        const parsedCategoryIds = categoryId.split(",").map(id => id.trim());
        query.categoryId = { $in: parsedCategoryIds };
    }
    const sortKind = {};
    if (sortName) {
        sortKind.name = sortName === 'ascend' ? 1 : -1;
    }
    if (sortPrice) {
        sortKind.price = sortPrice === 'ascend' ? 1 : -1;
    }
    if (sortDate) {
        sortKind.createdAt = sortDate === 'ascend' ? 1 : -1;
    }
    let finalQuery = { ...query };
    if (start_price || end_price) {
        finalQuery.price = {}; // Initialize price field
        if (start_price) finalQuery.price.$gte = parseFloat(start_price);
        if (end_price) finalQuery.price.$lte = parseFloat(end_price);
    }
    try {
        const products = await product_model.paginate(finalQuery, {
            offset: skip, page: page, limit: limit, sort: sortKind,
            populate: "categoryId"
        })


        return res.status(200).json({
            products
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const all_product = async (req, res) => {

    try {
        const data = await product_model.find({})
            .populate('Rating')
            .populate('Sale')
            .populate('Category')
        if (data.length === 0) {
            return res.status(404).json({ message: "No product" });
        }
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



export const category_product = async (req, res) => {
    const cateName = req.params.name;
    const limit = 9;
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * limit;
    try {
        const dataAll = await product_model.find({ category_name: cateName }).sort({ createdAt: -1 });
        const data = dataAll.slice(skip, skip + limit);
        if (dataAll.length === 0) {
            return res.status(404).json({ message: "No product" });
        }
        else {
            const total_page = Math.ceil(dataAll.length / limit);
            const product_list = data.map((product) => ({
                product_id: product.product_id,
                title: product.title,
                price: product.price,
                description: product.description,
                qty: product.qty,
                category_name: product.category_name,
                thumbnail: product.thumbnail,
                price_promotion: product.price_promotion,
                status: product.status
            })
            );
            return res.status(200).json({ product_list, total_page: total_page, total_product: dataAll.length, page: page });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const new_product = async (req, res) => {
    try {
        const data = await product_model.find({ isActive: true }).sort({ createdAt: -1 });
        if (data.length === 0) {
            return res.status(404).json({ message: "Product no exists" });
        }
        else {

            return res.status(200).json({ data });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const recommend_product = async (req, res) => {
    const product_id = req.params.id
    try {
        const product = await product_model.findById(product_id)
        const dataRecommend = await product_model.find({
            $or: [
                { categoryId: product.categoryId },
                { price: { $gte: product.price - 50, $lte: product.price + 50 } }
            ]
        });

        if (dataRecommend.length === 0) {
            return res.status(404).json({ message: "No recommend products" });
        }
        else {
            return res.status(200).json(dataRecommend);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const product_by_category = async (req, res) => {
    try {
        const category_id = req.params.category_id
        const data = await product_model.paginate({ categoryId: category_id }, {
            ...options, populate: "categoryId"
        });
        if (data.totalDocs === 0) {
            return res.status(404).json({ message: "No products" });
        }
        return res.status(200).json({ ...data });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}