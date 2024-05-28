import request from 'supertest'
import app from '../app.js'
import mongoose from "mongoose";
import dotenv from "dotenv";
import { jest } from '@jest/globals';


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



// describe("Test register api", () => {
//     test("Register user", async () => {

//         const userData = {
//             email: "testuser1@gmail.com",
//             password: "1234567",
//             confirm_password: "1234567",
//             gender: 'male',
//             phone: '09012312341',
//             username: 'testuser123',
//             firstName: "Van Long",
//             lastName: "Nguyen"
//         };

//         const response = await request(app)
//             .post('/api/register')
//             .send(userData)
//         console.log(response);
//         expect(response.statusCode).toBe(201);
//     });
// });


describe("Test inactive user", () => {
    test("Login by in active user", async () => {

        const userData = {
            email: "abcde123@gmail.com",
            password: "1234567",
        };

        const response = await request(app)
            .post('/api/login')
            .send(userData)
        expect(response.statusCode).toBe(401);
    });
});



describe("Test login wrong password", () => {
    test("Login wrong password", async () => {


        const userData = {
            email: "uzumakicf@gmail.com",
            password: "123456"
        };

        const response = await request(app)
            .post('/api/login')
            .send(userData)

        expect(response.statusCode).toBe(404);
    });
});


describe("Test login wrong email", () => {
    test("Login wrong email", async () => {


        const userData = {
            email: "uzumakicf1@gmail.com",
            password: "123456"
        };

        const response = await request(app)
            .post('/api/login')
            .send(userData)

        expect(response.statusCode).toBe(404);
    });
});


describe("Test register an existed email", () => {
    test("Register an existed email", async () => {

        const userData = {
            email: "uzumakicf@gmail.com",
            password: "1234567",
            confirm_password: "1234567",
            gender: 'male',
            phone: '09012312341',
            username: 'testuser123',
            firstName: "Van Long",
            lastName: "Nguyen"
        };

        const response = await request(app)
            .post('/api/register')
            .send(userData)
        expect(response.statusCode).toBe(400);
    });
});


describe("Test register an existed username", () => {
    test("Register an existed username", async () => {

        const userData = {
            email: "uzumakicf1234@gmail.com",
            password: "1234567",
            confirm_password: "1234567",
            gender: 'male',
            phone: '09012312341',
            username: 'abcde123',
            firstName: "Van Long",
            lastName: "Nguyen"
        };

        const response = await request(app)
            .post('/api/register')
            .send(userData)
        expect(response.statusCode).toBe(400);
    });
});
