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
    const { searchParam } = req.query;
    try {
        const result = await client.search({
            index: 'products',
            size: 10,
            _source: [],
            query: {
                match: {
                    name: searchParam
                }
            }
        })
        return res.json(result)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})
export default router;