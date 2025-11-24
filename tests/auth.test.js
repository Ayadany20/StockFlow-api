import request from 'supertest';
import app from '../src/app.js';

describe('Auth', ()=>{
  test('register and login', async ()=>{
    const email = `test${Date.now()}@example.com`;

    const reg = await request(app).post('/api/auth/register')
      .send({ name:'Test', email, password:'pass1234', role:'user' });

    expect(reg.statusCode).toBe(201);
    expect(reg.body.token).toBeDefined();

    const login = await request(app).post('/api/auth/login')
      .send({ email, password:'pass1234' });

    expect(login.statusCode).toBe(200);
    expect(login.body.token).toBeDefined();
  }, 15000);
});
