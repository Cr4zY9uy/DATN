// import { upload_image } from "./upload_controller.js";
import category_model from "../models/category_model.js"
import { options } from "../paginate/options.js";
import product_model from "../models/product_model.js";

export const add_category = async (req, res) => {

    const { name, image, description, order, isActive } = req.body;

    try {
        const checkExistName = await category_model.findOne({ name: name });
        if (checkExistName != null) {
            return res.status(400).json({ messsage: "Category name is existed" });
        }

        const checkExistOrder = await category_model.findOne({ order: order });
        if (checkExistOrder) {
            return res.status(400).json({ message: "Category order already taken" });
        }

        const category = await category_model.create({ name, image, description, order, isActive });
        if (category) {
            return res.status(201).json({ category, message: "Add a category successfully" });
        }

        return res.status(400).json({ message: "Add a category unsuccessfully " })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const update_category = async (req, res) => {
    const category_id = req.params.id;
    const { name, image, description, isActive, order } = req.body;
    const data = {};
    if (name) data.name = name;
    if (description) data.description = description;
    if (isActive !== '') data.isActive = isActive;
    if (image) data.image = image
    if (order) data.order = order
    try {
        const category = await category_model.findOne({ _id: category_id });
        if (!category) {
            return res.status(404).json({ message: "Category does not exist" });
        }
        if (category.name.toLowerCase() === 'default') return res.status(400).json({ message: "Can't update default category" });

        if (order && order !== category.order) {
            const checkExistOrder = await category_model.findOne({ order: order });
            if (checkExistOrder) {
                return res.status(400).json({ message: "Category order already taken" });
            }
        }

        const updated_category = await category_model.findOneAndUpdate(
            { _id: category_id },
            data,
            { new: true }
        );
        if (updated_category)
            return res.status(200).json({ ...updated_category._doc });
        return res.status(400).json({ message: "Update unsuccessfully " })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const detail_category = async (req, res) => {
    try {
        const category_id = req.params.id;
        const data = await category_model.findOne({ _id: category_id })
        if (data === null) {
            return res.status(404).json({ message: "Category no exists" });
        }
        return res.status(200).json({
            ...data._doc
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const delete_category_one = async (req, res) => {
    try {
        const id = req.params.id;
        const checkDefault = await category_model.findOne({ _id: id })
        if (checkDefault.name.toLowerCase() === 'default')
            return res.status(400).json({ message: "Can't delete default category" });
        const defaultCategory = await category_model.findOne({ name: 'Default' });
        if (!defaultCategory) {
            return res.status(400).json({ message: "Default category not found" });
        }
        await product_model.updateMany({ categoryId: id }, { categoryId: defaultCategory._id });
        const data = await category_model.findOneAndDelete({ _id: id });

        if (data !== null) {
            return res.status(200).json({ message: "Category deleted successfully" });
        } else {
            return res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const delete_category_list = async (req, res) => {
    try {
        const category_id = req.body.id;
        if (!category_id || category_id.length === 0) {
            return res.status(400).json({ message: "Please provide list of category_id" });
        }
        const existingCategories = await category_model.find({ _id: { $in: category_id } });
        const hasDefaultCategory = existingCategories.some(category => category.name.toLowerCase() === 'default');
        if (hasDefaultCategory) return res.status(400).json({ message: "Can't delete default category" });
        if (existingCategories.length !== category_id.length) {
            return res.status(404).json({ message: "One or more categories not found" });
        }
        const defaultCategory = await category_model.findOne({ name: 'Default' });
        if (!defaultCategory) {
            return res.status(400).json({ message: "Default category not found" });
        }

        await product_model.updateMany({ categoryId: { $in: category_id } }, { categoryId: defaultCategory._id });
        const data = await category_model.deleteMany({ _id: { $in: category_id } });
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
    const { name, description, isActive, sortOrder, sortName, page } = req.query
    const limit = 6;
    const skip = page ? (page - 1) * limit : 0;
    const query = {};
    if (name) query.name = name;
    if (description) query.description = description;
    if (isActive) query.isActive = isActive;
    let sortKind = {};
    if (sortOrder) {
        if (sortOrder === 'ascend') {
            sortKind.order = 1;
        } else {
            sortKind.order = -1;
        }
    }

    if (sortName) {
        if (sortName === 'ascend') {
            sortKind.name = 1;
        } else {
            sortKind.name = -1;
        }
    }

    try {
        const dataAll = await category_model.paginate(query, {
            offset: skip, page: page, limit: limit, sort: sortKind
        });
        if (dataAll.totalDocs === 0) {
            return res.status(404).json({ message: "No category" });
        }
        return res.status(200).json({ ...dataAll });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const all_category = async (req, res) => {
    try {
        const data = await category_model.find({});
        if (data.length === 0) {
            return res.status(404).json({ message: "No category" });
        }
        else return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const product_by_category = async (req, res) => {
    try {
        const id = req.params.id
        const data = await category_model.paginate({ _id: id }, {
            ...options, populate: {
                path: "_id",
                model: "Product"
            }
        });
        if (data.totalDocs === 0) {
            return res.status(404).json({ message: "No category" });
        }
        return res.status(200).json({ ...data });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


