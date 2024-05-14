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
        const result = await client.search({
            index: 'products',
            from: skip,
            size: limit,
            body: {
                query: {
                    match: {
                        name: searchParam
                    }
                },
                aggregations: {
                    sales: {
                        terms: {
                            field: '_id',
                            size: limit
                        },
                        aggs: {
                            product_sales_nested: {
                                nested: {
                                    path: 'products'
                                },
                                aggs: {
                                    product_sales_filter: {
                                        filter: {
                                            term: { 'products.productId': '$_key' }
                                        },
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})
export default router;