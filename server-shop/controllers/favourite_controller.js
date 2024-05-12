import favourite_model from "../models/favourite_model.js";

export const addFavourite = async (req, res) => {
    const user_id = req.user._id
    const data = req.body.productId
    try {
        const favouriteOfUser = await favourite_model.findOne({ userId: user_id })
        if (favouriteOfUser) {
            const isProductExists = favouriteOfUser.products.includes(data);
            if (isProductExists) {
                return res.status(400).json({ message: "Product already exists in the wishlist." });
            }
            const pushFavourite = await favourite_model.findOneAndUpdate({ _id: favouriteOfUser._id }, { $push: { products: data } }, { new: true })
            return res.status(200).json(pushFavourite);
        }
        else {
            const createFavourite = await favourite_model.create({ userId: user_id, products: [data] })
            return res.status(201).json(createFavourite);
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteFavourite = async (req, res) => {
    const user_id = req.user._id;
    const productIdToDelete = req.body.productId;

    try {
        const updatedFavourite = await favourite_model.findOneAndUpdate(
            { userId: user_id },
            { $pull: { products: productIdToDelete } },
            { new: true }
        );

        if (!updatedFavourite) {
            return res.status(404).json({ message: "No favourite" });
        } else {
            return res.status(200).json(updatedFavourite);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getFavourite = async (req, res) => {
    const user_id = req.user._id
    try {
        const favourite = await favourite_model.findOne({ userId: user_id }).populate({
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