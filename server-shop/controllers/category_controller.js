import { upload_image } from "../cloudinary/upload_image.js";
import category_model from "../models/category_model.js"

export const add_category = async (req, res) => {
    try {
        const data = req.body;
        const checkExistId = await category_model.findOne({ category_id: data.category_id });
        if (checkExistId != null) {
            return res.status(400).json({ messsage: "Category id is existed" });
        }
        const checkExistName = await category_model.findOne({ name: data.name });
        if (checkExistName != null) {
            return res.status(400).json({ messsage: "Category name is existed" });
        }
        try {
            const uploadedImage = await upload_image(data.image);
            data.image = uploadedImage;
        } catch (uploadError) {
            return res.status(404).json({ message: "Error uploading image", error: uploadError.message });
        }
        const category = await category_model.create(data);
        if (category) {
            return res.status(201).json({ category, message: "Add a category successfully" });
        }
        else {
            return res.status(400).json({ message: error.message });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const edit_category = async (req, res) => {
    try {
        const category_id = req.params.id;
        const data = req.body;
        const find = await category_model.findOne({ category_id });
        if (!find) {
            return res.status(404).json({ message: "Category does not exist" });
        }

        if (data.image !== "") {
            try {
                const uploadedImage = await upload_image(data.image);
                data.image = uploadedImage;
            } catch (uploadError) {
                return res.status(404).json({ message: "Error uploading image", error: uploadError.message });
            }
        } else {
            data.image = find.image;
        }
        const update_category = await category_model.findOneAndUpdate(
            { category_id },
            { name: data.name, description: data.description, image: data.image },
            { new: true }
        );
        return res.status(200).json({ updated_category: update_category });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const detail_category = async (req, res) => {
    try {
        const category_id = req.params.id;
        const data = await category_model.findOne({ category_id: category_id }).select("category_id name description image")
        if (data === null) {
            return res.status(404).json({ message: "Category no exists" });
        }
        else {

            return res.status(200).json({
                category: {
                    category_id: data.category_id,
                    name: data.name,
                    description: data.description,
                    image: data.image
                }
            });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const delete_category_one = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await category_model.findOneAndDelete({ category_id: id });
        if (data !== null) {
            return res.status(200).json({ message: "Category deleted successfully" });
        } else {
            return res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const delete_category_all = async (req, res) => {
    try {
        const data = await category_model.deleteMany({ "category_id": { $exists: true } });
        if (data) {
            return res.status(200).json({ message: "Categories deleted successfully" });
        } else {
            return res.status(404).json({ message: "Categories not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const delete_category_list = async (req, res) => {
    try {
        const category_id = req.body.category_id;
        if (!category_id || category_id.length === 0) {
            return res.status(400).json({ message: "Please provide list of category_id" });
        }
        const data = await category_model.deleteMany({ category_id: { $in: category_id } });

        if (data) {
            return res.status(200).json({ message: "Categories deleted successfully" });
        } else {
            return res.status(404).json({ message: "Categories not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const paginate_category = async (req, res) => {
    const limit = 6;
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * limit;
    try {
        const dataAll = await category_model.find().sort({ createdAt: -1 });
        const data = dataAll.slice(skip, skip + limit);
        const total_page = Math.ceil(dataAll.length / limit);
        if (data.length === 0) {
            return res.status(404).json({ message: "No category" });
        }
        else {
            const category_list = data.map((category) => ({
                category_id: category.category_id,
                name: category.name,
                description: category.description,
                image: category.image
            })
            );
            return res.status(200).json({ category_list, total_page: total_page, total_product: dataAll.length, page: page });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const all_category = async (req, res) => {

    try {
        const data = await category_model.find().sort({ createdAt: -1 });
        if (data.length === 0) {
            return res.status(404).json({ message: "No category" });
        }
        else {
            const category_list = data.map((category) => ({
                category_id: category.category_id,
                name: category.name,
                description: category.description,
                image: category.image
            })
            );
            return res.status(200).json({ category_list });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}