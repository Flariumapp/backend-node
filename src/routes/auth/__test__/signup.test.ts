import request from 'supertest';
import { app } from '../../../../app';
import { User } from '../../../models/user';

const SIGN_UP_URL = '/api/auth/signup';

const signup = async (userName:string|undefined, email:string|undefined, name:string, age:number, password:string|undefined, status:number) => {
    return request(app).post(SIGN_UP_URL).send({
        userName,
        email,
        name,
        age,
        password,
    }).expect(status);
}

describe('Signup tests', () => {
    it('fails if email is not provided', async () => {
        await signup('test', undefined, 'test name', 20, 'wfwhqofehoq', 400);
    });

    it('fails if userName is not provided', async () => {
        await signup(undefined, 'test@test.com', 'test name', 20, 'wfwhqofehoq', 400);
    });

    it('fails if password is not provided', async () => {
        await signup('test', 'test@test.com', 'test name', 20, undefined, 400);
    });

    it('fails if invalid credentials are provided', async () => {
        await signup('1', 'test@test.com', 'test name', 20, 'whowhowq', 400);
        await signup('test', 'test', 'test name', 20, 'whowhowq', 400);
        await signup('test', 'test@test.com', 'test name', 20, 'who', 400);
    });

    it('fails if email is already occupied', async () => {
        await signup('test', 'test@test.com', 'test name', 20, 'whowhowq', 201);
        await signup('test1', 'test@test.com', 'test name1', 21, 'whowhowq', 400);
    });

    it('fails if username is already occupied', async () => {
        await signup('test', 'test@test.com', 'test name', 20, 'whowhowq', 201);
        await signup('test', 'test@test1.com', 'test name1', 21, 'whowhowq', 400);
    });

    it('succeeds if valid credentials are provided', async () => {
        await signup('test', 'test@test.com', 'test name', 20, 'whowhowq', 201);
    });
});