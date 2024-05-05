import favourite_model from "../models/favourite_model.js";

export const addFavourite = async (req, res) => {
    const user_id = req.user
    const data = req.body
    try {
        const favouriteOfUser = await favourite_model.findOne({ userId: user_id })
        if (!favouriteOfUser) {
            const updateFavourite = await favourite_model.findOneAndUpdate({ _id: favouriteOfUser._id }, data, { new: true })
            return res.status(200).json(updateFavourite);
        }
        else {
            const createFavourite = await favourite_model.create({ userId: user_id, products: data })
            return res.status(201).json(createFavourite);
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteFavourite = async (req, res) => {
    const user_id = req.user
    const data = req.body
    try {
        const deleteProduct = await favourite_model.findOneAndDelete({ userId: user_id }, { products: data })
        if (!deleteProduct)
            return res.status(404).json({ message: "No favourite" });
        else {
            return res.status(200).json(deleteProduct);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getFavourite = async (req, res) => {
    const user_id = req.user
    try {
        const favourite = await favourite_model.findOne({ userId: user_id }).populate({
            path: "userId",
            model: "User"
        }).populate({
            path: "products",
            model: "Product"
        })
        if (!favourite)
            return res.status(404).json({ message: "No favourite" });
        else {
            return res.status(200).json(favourite);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}