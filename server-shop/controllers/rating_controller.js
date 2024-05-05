import rating_model from "../models/rating_model.js"
import { options } from "../paginate/options.js";

export const add_rating = async (req, res) => {

    const { name, image, description, order, isActive } = req.body;

    try {
        const checkExistName = await rating_model.findOne({ name: name });
        if (checkExistName != null) {
            return res.status(400).json({ messsage: "Category name is existed" });
        }

        const checkExistOrder = await rating_model.findOne({ order: order });
        if (checkExistOrder) {
            return res.status(400).json({ message: "Category order already taken" });
        }

        const category = await rating_model.create({ name, image, description, order, isActive });
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
        const category = await rating_model.findOne({ _id: category_id });
        if (!category) {
            return res.status(404).json({ message: "Category does not exist" });
        }
        if (category.name.toLowerCase() === 'default') return
        if (order && order !== category.order) {
            const checkExistOrder = await rating_model.findOne({ order: order });
            if (checkExistOrder) {
                return res.status(400).json({ message: "Category order already taken" });
            }
        }

        const updated_category = await rating_model.findOneAndUpdate(
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
        const data = await rating_model.findOne({ _id: category_id })
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

export const paginate_rating= async (req, res) => {
    const { name, description, isActive, sortOrder, sortName, page } = req.query
    const limit = 6;
    const skip = (page - 1) * limit;
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
        const dataAll = await rating_model.paginate(query, {
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

export const all_rating = async (req, res) => {
    try {
        const data = await rating_model.find({});
        if (data.length === 0) {
            return res.status(404).json({ message: "No category" });
        }
        else return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
