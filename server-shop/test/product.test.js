import request from 'supertest'
import app from '../app.js'
import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

beforeEach(async () => {
    await mongoose.connect(process.env.URL_DB);
});

afterEach(async () => {
    await mongoose.connection.close();
});

describe("Product api", () => {
    test("GET /api/product/options/all", async () => {

        const response = await request(app)
            .get('/api/product/options/all')
        expect(response.statusCode).toBe(200);
    });
});

