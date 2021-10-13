import request from 'supertest';
import { app } from '../../../../app';

const SIGN_UP_URL = '/api/auth/signup';
const LOGIN_URL = '/api/auth/login';

const signup = async (userName:string, email:string, name:string, age:number, password:string, status:number) => {
    return request(app)
    .post(SIGN_UP_URL)
    .send({
        userName,
        email,
        name,
        age,
        password,
    }).expect(status);
}

const login = async (email:string, password:string, status:number) => {
    return request(app).post(LOGIN_URL).send({
        email,
        password
    }).expect(status);
}

describe('Login tests', () => {
    it('fails if invalid email is provided', async () => {
        await login('test', 'wohwohqow', 400);
    });

    it('fails if invalid password is provided', async () => {
        await login('test@test.com', 'whw', 400);
    });

    it('fails if no such user is found', async () => {
        // await signup('test', 'test@test.com', 'test name', 20, 'wohqohqo', 200);
        await login('test@test.com', 'wohowfow', 400);
    });

    it('fails if password is incorrect', async () => {
        await signup('test', 'test@test.com', 'test name', 20, 'password', 201);
        await login('test@test.com', 'oihwoehgwo', 400);
    });

    it('succeeds if the user credentials are registered', async () => {
        await signup('test', 'test@test.com', 'test name', 20, 'wohqohqo', 201);
        await login('test@test.com', 'wohqohqo', 200);
    });
});