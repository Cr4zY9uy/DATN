import upload_image from "../cloudinary/upload_image.js";
import product_model from "../models/product_model.js"

export const add_product = async (req, res) => {
    try {
        const data = req.body;
        const checkExistId = await product_model.findOne({ product_id: data.product_id });
        if (checkExistId != null) {
            return res.status(400).json({ messsage: "Product id is existed" });
        }
        const checkExistName = await product_model.findOne({ title: data.title });
        if (checkExistName != null) {
            return res.status(400).json({ messsage: "Product name is existed" });
        }
        try {
            const uploadedImage = await upload_image(data.thumbnail);
            data.thumbnail = uploadedImage;
        } catch (uploadError) {
            return res.status(404).json({ message: "Error uploading image", error: uploadError.message });
        }
        const product = await product_model.create(data);
        if (product) {
            return res.status(201).json({ product, message: "Add a product successfully" });
        }
        else {
            return res.status(400).json({ error: error.message });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const edit_product = async (req, res) => {
    try {
        const product_id = req.params.id;
        const data = req.body;
        const find = await product_model.findOne({ product_id });
        if (!find) {
            return res.status(404).json({ message: "Product does not exist" });
        }

        if (data.thumbnail !== "") {
            try {
                const uploadedImage = await upload_image(data.thumbnail);
                data.thumbnail = uploadedImage;
            } catch (uploadError) {
                return res.status(404).json({ message: "Error uploading image", error: uploadError.message });
            }
        } else {
            data.thumbnail = find.thumbnail;
        }
        const update_product = await product_model.findOneAndUpdate(
            { product_id },
            {
                title: data.title,
                price: data.price,
                description: data.description,
                qty: data.qty,
                category_name: data.category_name,
                thumbnail: data.thumbnail,
                price_promotion: data.price_promotion,
                status: data.status
            },
            { new: true }
        );
        return res.status(200).json({ updated_product: update_product });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const detail_product = async (req, res) => {
    const product_id = req.params.id;
    try {
        const data = await product_model.findOne({ product_id: product_id })
        if (data === null) {
            return res.status(404).json({ message: "Product no exists" });
        }
        else {
            const product = {
                product_id: product_id,
                title: data.title,
                price: data.price,
                description: data.description,
                qty: data.qty,
                category_name: data.category_name,
                thumbnail: data.thumbnail,
                price_promotion: data.price_promotion,
                status: data.status
            };
            return res.status(200).json({ product });
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
    const limit = 9;
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * limit;
    try {
        const dataAll = await product_model.find().sort({ createdAt: -1 });
        const data = dataAll.slice(skip, skip + limit);
        if (data.length === 0) {
            return res.status(404).json({ message: "No product" });
        }
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
        }));
        return res.status(200).json({ product_list, total_page: total_page, total_product: dataAll.length, page: page });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const all_product = async (req, res) => {

    try {
        const data = await product_model.find().sort({ createdAt: -1 });
        if (data.length === 0) {
            return res.status(404).json({ message: "No product" });
        }
        else {
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
            return res.status(200).json({ product_list });
        }
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
export const hot_product = async (req, res) => {
    try {
        const data = await product_model.find({ status: 1 })
        if (data.length === 0) {
            return res.status(404).json({ message: "Product no exists" });
        }
        else {
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
            }
            ))

            return res.status(200).json({ product_list });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const by_code_product = async (req, res) => {
    const limit = 9;
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * limit;
    const product_id = req.params.id ? req.params.id : "";
    const encodeId = decodeURIComponent(product_id);
    try {
        const dataAll = await product_model.find({ product_id: { $regex: new RegExp(encodeId, 'i') } }).sort({ createdAt: -1 });
        const data = dataAll.slice(skip, skip + limit);
        const total_page = Math.ceil(dataAll.length / limit);
        if (data === null) {
            return res.status(404).json({ message: "Product no exists" });
        }
        else {
            const product = data.map((item) => ({
                product_id: item.product_id,
                title: item.title,
                price: item.price,
                description: item.description,
                qty: item.qty,
                category_name: item.category_name,
                thumbnail: item.thumbnail,
                price_promotion: item.price_promotion,
                status: item.status
            }));
            return res.status(200).json({ product, total_page: total_page, total_product: dataAll.length, page: page });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const by_name_product = async (req, res) => {
    const limit = 9;
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * limit;
    const name = req.params.name ? req.params.name : "";
    const encodeTitle = decodeURIComponent(name);
    try {
        const dataAll = await product_model.find({ title: { $regex: new RegExp(encodeTitle, 'i') } }).sort({ createdAt: -1 });
        const data = dataAll.slice(skip, skip + limit);
        const total_page = Math.ceil(dataAll.length / limit);
        if (data === null) {
            return res.status(404).json({ message: "Product no exists" });
        }
        else {
            const product = data.map((item) => ({
                product_id: item.product_id,
                title: item.title,
                price: item.price,
                description: item.description,
                qty: item.qty,
                category_name: item.category_name,
                thumbnail: item.thumbnail,
                price_promotion: item.price_promotion,
                status: item.status
            }));
            return res.status(200).json({ product, total_page: total_page, total_product: dataAll.length, page: page });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}