import { Client } from '@elastic/elasticsearch'
import { Router } from "express";
import fs from 'fs'

const router = Router();

const client = new Client({
    node: 'https://elastic:NoiLk3W_uvCJG-LpMEK=@localhost:9200',
    tls: {
        ca: fs.readFileSync('http_ca.crt'),
        rejectUnauthorized: false
    }
})

router.get('/search', async (req, res) => {
    const { searchParam, page } = req.query;
    const limit = 6;
    const skip = page ? limit * (page - 1) : 0
    try {
        const productResult = await client.search({
            index: 'products',
            from: skip,
            size: limit,
            body: {
                query: {
                    multi_match: {
                        query: searchParam,
                        fields: ['name'],
                        auto_generate_synonyms_phrase_query: true
                    }
                }
            }

        });

        const totalItem = productResult.hits.total.value;
        const products = productResult.hits.hits;

        // Lấy danh sách các productIds từ kết quả tìm kiếm sản phẩm
        const productIds = products.map(product => product._id);

        // Tìm tất cả các sales liên quan đến các productIds
        const saleResult = await client.search({
            index: 'sales',
            body: {
                query: {
                    bool: {
                        should: [
                            {
                                terms: {
                                    'products.productId': productIds
                                }
                            }
                        ]
                    }
                }
            }
        });

        const sales = saleResult.hits.hits;

        // Map productIds đến sales
        const salesMap = sales.reduce((map, sale) => {
            sale._source.products.forEach(product => {
                if (productIds.includes(product.productId)) {
                    if (!map[product.productId]) {
                        map[product.productId] = [];
                    }
                    map[product.productId].push({
                        saleId: sale._id,
                        pricePromotion: product.pricePromotion,
                        applyDate: sale._source.applyDate,
                        dueDate: sale._source.dueDate,
                        isActive: sale._source.isActive
                    });
                }
            });
            return map;
        }, {});

        // Gán thông tin sale vào sản phẩm
        const results = products.map(product => {
            const productId = product._id;
            return {
                ...product._source,
                _id: productId,
                sales: salesMap[productId] || []
            };
        });

        return res.status(200).json({ item: results, total: totalItem });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})
export default router;