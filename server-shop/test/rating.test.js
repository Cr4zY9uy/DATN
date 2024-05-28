import request from 'supertest'
import app from '../app.js'
import mongoose from "mongoose";
import dotenv from "dotenv";
import { beforeEach, jest } from '@jest/globals';


dotenv.config();

beforeEach(async () => {
    await mongoose.connect(process.env.URL_DB);
});

afterEach(async () => {
    await mongoose.connection.close();
});

describe("Test create rating", () => {
    let cookies;
    beforeEach(async () => {
        const userData = {
            email: "uzumakicf@gmail.com",
            password: "1234567"
        };
        const response = await request(app)
            .post('/api/login')
            .send(userData);

        const setCookieHeader = response.headers['set-cookie'];
        setCookieHeader.forEach(cookie => {
            if (cookie.startsWith('access_token=')) {
                cookies = cookie
            }
        });

    });
    test("Test create rating", async () => {
        const ratingData = {
            stars: 4.5,
            productId: '6633bc88bba2aa861be4a451'
        };

        const response = await request(app)
            .post('/api/rating')
            .set('Cookie', cookies)
            .send(ratingData);

        expect(response.statusCode).toBe(201);

    });
});




