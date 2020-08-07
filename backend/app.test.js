require('dotenv').config({ path: '.env.testing' });
const app = require('./app.js');
const supertest = require('supertest');
const request = supertest(app.app);
const mysql = require('mysql');
const { promisify } = require('util');

const pool = mysql.createPool({
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
const query = promisify(pool.query).bind(pool);

function register(request) {
    return request.post('/register')
                .send({
                    username: 'test',
                    password: 'testpass'
                });
}

async function login(request) {
    await register(request);
    return request.post('/login')
                .send({
                    username: 'test',
                    password: 'testpass'
                });
}

async function addItem(request, token) {
    return request.post('/todo')
                .set('Authorization', `Bearer ${token.body.token}`)
                .send({
                    title: 'tegevus',
                    state: false
                });
}

it('gets the tere endpoint', async () => {
    const res = await request.get('/todo/tere');
    expect(res.status).toBe(200);
    expect(res.text).toBe('tere tere vanakere, oled jõudnud saladuste laekani');
}); 

it('Should save user to database', async () => {
    await register(request);
    const rows = await query('select * from users where username="test"');
    expect(rows.length).toBe(1);
    expect(rows[0].username).toBeTruthy();
});

it('Should login user', async () => {
    const res = await login(request);
    expect(res.body.token).toBeTruthy();
});

it('Should add item to todo list', async () => {
    const token = await login(request);
    const res = await addItem(request, token);
    const rows = await query('select * from todo where title="tegevus"');
    expect(rows.length).not.toBe(0);
    expect(res.body).toBeTruthy();
});

it('Should delete item from todo list', async () => {
    const token = await login(request);
    const res = await addItem(request, token);
    const wat = await request.delete(`/todo/${res.body}`).set('Authorization', `Bearer ${token.body.token}`);
    expect(wat.text).toBe('wat');
});

it('Should update state of item in todo list', async () => {
    const token = await login(request);
    const res = await addItem(request, token);
    const scared = await request.put(`/todo/${res.body}`).set('Authorization', `Bearer ${token.body.token}`);
    expect(scared.text).toBe('aim scared');
});

it('Should get todo list', async () => {
    const token = await login(request);
    await addItem(request, token);
    const todo = await request.get('/todo').set('Authorization', `Bearer ${token.body.token}`);
    expect(todo.body.length).not.toBe(0);
    expect(todo.body[0].title).toBe('tegevus');
    expect(todo.body[0].state).toBeFalsy();
});

afterEach(async () => {
    await query('delete from users');
    await query('delete from todo');
});

afterAll(async () => {
    app.closePool();
    pool.end();
});