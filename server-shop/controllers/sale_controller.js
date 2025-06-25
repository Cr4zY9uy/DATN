import product_model from "../models/product_model.js";
import sale_model from "../models/sale_model.js";

export const add_sale = async (req, res) => {
    const { products, applyDate, dueDate, isActive } = req.body;
    try {
        const productPromises = products.map(async item => {
            return await product_model.findById(item?.productId);
        });
        const productResults = await Promise.all(productPromises);
        const nonExistentProducts = productResults.some(result => !result);
        if (nonExistentProducts) {
            return res.status(404).json({ message: "One or more products not existed." });
        }
        const createdResult = await sale_model.create({ products, applyDate: new Date(applyDate), dueDate: new Date(dueDate), isActive })
        await Promise.all(products.map(async item => {
            await product_model.findByIdAndUpdate(item?.productId, { $push: { saleId: createdResult._id } });
        }));
        if (!createdResult) return res.status(404).json({ message: "Add sale unsuccessfully!" })
        return res.status(201).json(createdResult)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
export const updateSale = async (req, res) => {
    const { products, applyDate, dueDate, isActive } = req.body;

    const data = {}
    if (products) data.products = products
    if (applyDate) data.applyDate = new Date(applyDate)
    if (dueDate) data.dueDate = new Date(dueDate)
    if (isActive !== '') data.isActive = isActive

    const saleId = req.params.id
    try {
        const findSale = await sale_model.findById(saleId)
        if (!findSale) return res.status(404).json({ message: "Sale not existed." });

        const existingProductsInSale = data.products ? findSale.products.filter(item => !products.some(p => p.productId === item.productId)) : [];

        if (existingProductsInSale.length !== 0) {
            await Promise.all(existingProductsInSale.map(async item => {
                await product_model.findByIdAndUpdate(item.productId, { $pull: { saleId: saleId } });
            }));

            // Tìm các sản phẩm trong products của sale mà đã có saleId
            const existingProducts = await Promise.all(products.map(async item => {
                const product = await product_model.findById(item?.productId);
                if (product.saleId.includes(saleId)) {
                    return item.productId;
                }
            }));

            // Lọc ra các sản phẩm không có trong danh sách existingProducts
            const filteredProducts = products.filter(item => !existingProducts.includes(item.productId));

            if (filteredProducts.length === 0) {
                return res.status(200).json({ message: "All products already have saleId." });
            }

            const productPromises = filteredProducts.map(async item => {
                return await product_model.findById(item?.productId);
            });
            const productResults = await Promise.all(productPromises);
            const nonExistentProducts = productResults.some(result => !result);
            if (nonExistentProducts) {
                return res.status(404).json({ message: "One or more products not existed." });

            }
            await Promise.all(filteredProducts.map(async item => {
                await product_model.findByIdAndUpdate(item?.productId, { $push: { saleId: saleId } });
            }));
            const updateResult = await sale_model.findByIdAndUpdate(saleId, data, { new: true });
            if (!updateResult) return res.status(404).json({ message: "Update sale unsuccessful!" })
            return res.status(200).json(updateResult);
        }
        const updateResultStatus = await sale_model.findByIdAndUpdate(saleId, data, { new: true });
        if (!updateResultStatus) return res.status(404).json({ message: "Update sale unsuccessful!" })
        return res.status(200).json(updateResultStatus);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}



export const delete_sale = async (req, res) => {
    const saleId = req.params.id
    try {
        const deletedSale = await sale_model.findOneAndDelete({ _id: saleId })
        if (!deletedSale) return res.status(404).json({ message: "Delete sale unsuccessful!" })
        const updateResult = await product_model.updateMany(
            { saleId: { $elemMatch: { $eq: saleId } } },
            { $pull: { saleId: saleId } }
        );
        if (!updateResult) {
            return res.status(404).json({ message: "Update products failed!" });
        }
        return res.status(200).json({ message: "Sale deleted successfully!" });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export const paginate_sale = async (req, res) => {
    const { page, applyDate, dueDate, sortDate, isActive } = req.query;
    const limit = 6;
    const skip = (page - 1) * limit;
    const query = {};
    if (isActive) query.isActive = isActive
    const sortKind = {};
    if (sortDate) {
        sortKind.createdAt = sortDate === 'ascend' ? 1 : -1;
    }
    let finalQuery = { ...query };

    if (applyDate) {
        finalQuery.applyDate = {};
        finalQuery.applyDate.$gte = new Date(applyDate);
    }
    if (dueDate) {
        finalQuery.dueDate = {};
        finalQuery.dueDate.$lte = new Date(dueDate);
    }
    try {
        const sales = await sale_model.paginate(finalQuery, {
            offset: skip, page: page, limit: limit, sort: sortKind,
            populate: {
                path: "products.productId",
                model: "Product"
            }
        })

        return res.status(200).json(sales);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



export const all_sale = async (req, res) => {
    try {
        const data = await sale_model.find({})
            .populate({
                path: "products.productId",
                model: "Product"
            }
            )


        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const detail_sale = async (req, res) => {
    const saleId = req.params.id
    try {
        const sale = await sale_model.findOne({ _id: saleId }).populate({ path: "products.productId", model: "Product" })
        if (!sale) return res.status(404).json({ message: "Sale not existed!" });
        return res.status(200).json(sale);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const lastest_sale = async (req, res) => {
    try {
        const currentDate = new Date();
        const latestSale = await sale_model.findOne({
            dueDate: { $gt: currentDate }
        }).sort({ createdAt: -1 }).populate({ path: "products.productId", model: "Product" });

        if (!latestSale) {
            return res.status(404).json({ message: "No sale found!" });
        }

        return res.status(200).json(latestSale);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};