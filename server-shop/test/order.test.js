import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
    await mongoose.connect(process.env.URL_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Test empty order", () => {
    let cookies;
    let userId;
    beforeAll(async () => {
        // Login to get the authentication cookies
        const userData = {
            email: "uzumakicf@gmail.com",
            password: "1234567"
        };
        const response = await request(app)
            .post('/api/login')
            .send(userData);

        const setCookieHeader = response.headers['set-cookie'];
        userId = response.body.user_id
        setCookieHeader.forEach(cookie => {
            if (cookie.startsWith('access_token=')) {
                cookies = cookie
            }
        });

    });
    test("Test empty order", async () => {
        const orderData = {
            userId: userId,
            firstNameReceiver: "Nguyen Thanh",
            lastNameReceiver: "Long",
            phoneReceiver: "091238390123",
            emailReceiver: "uzumakicf@gmail.com",
            addressReceiver: "ha noi",
            countryReceiver: "Vietnam",
            paymentMethod: "vnpay",
            shippingMethod: "standard",
            paymentStatus: "paid",
            shippingStatus: "sent",
            orderStatus: "processing",
            products: [],
            tax: 68.4,
            shippingCost: 1000,
            total: 1828.4,
            note: "asdjkas"
        };

        const response = await request(app)
            .post('/api/order')
            .set('Cookie', cookies)
            .send(orderData);

        expect(response.statusCode).toBe(400);

    });
});


describe("Test create order", () => {
    let cookies;
    let userId;
    beforeAll(async () => {
        const userData = {
            email: "uzumakicf@gmail.com",
            password: "1234567"
        };
        const response = await request(app)
            .post('/api/login')
            .send(userData);

        const setCookieHeader = response.headers['set-cookie'];
        userId = response.body.user_id
        setCookieHeader.forEach(cookie => {
            if (cookie.startsWith('access_token=')) {
                cookies = cookie
            }
        });

    });
    test("Test create order", async () => {
        const orderData = {
            userId: userId,
            firstNameReceiver: "Nguyen Thanh",
            lastNameReceiver: "Long",
            phoneReceiver: "091238390123",
            emailReceiver: "uzumakicf@gmail.com",
            addressReceiver: "ha noi",
            countryReceiver: "Vietnam",
            paymentMethod: "vnpay",
            shippingMethod: "standard",
            paymentStatus: "paid",
            shippingStatus: "sent",
            orderStatus: "processing",
            products: [
                {
                    "productId": "6633bdd5bba2aa861be4a473",
                    "subPrice": 360,
                    "quantity": 3
                },
                {
                    "productId": "6633c3eebba2aa861be4a5c6",
                    "subPrice": 400,
                    "quantity": 2
                }
            ],
            tax: 68.4,
            shippingCost: 1000,
            total: 1828.4,
            note: "asdjkas"
        };

        const response = await request(app)
            .post('/api/order')
            .set('Cookie', cookies)
            .send(orderData);

        expect(response.statusCode).toBe(201);
    });
});
