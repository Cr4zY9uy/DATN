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

describe("Test login api", () => {
    test("Login user", async () => {
        const userData = {
            email: "uzumakicf@gmail.com",
            password: "1234567"
        };

        const response = await request(app)
            .post('/api/login')
            .send(userData)

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("username");
        expect(response.body).toHaveProperty("email");
    });
});


