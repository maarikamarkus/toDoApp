require('dotenv').config({ path: '.env.testing' });
const app = require('./app.js');
const supertest = require('supertest');
const request = supertest(app.app);
const mysql = require('mysql');
const { promisify } = require('util');
const { exception } = require('console');

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
    const res = await request.post('/todo')
                .set('Authorization', `Bearer ${token.body.token}`)
                .send({
                    title: 'tegevus',
                    state: false
                });
    return res.text;
}

function getToDoList(request, token) {
    return request.get('/todo').set('Authorization', `Bearer ${token.body.token}`);
};

async function getToDoItem(id) {
    const rows = await query('select * from todo where id=?', id);
    if (rows.length === 1) {
        return rows[0];
    } else {
        throw new Error(`Could not find item with id ${id} from database`);
    }
};

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
    const id = await addItem(request, token);
    const item = await getToDoItem(id);
    expect(item.title).toBe('tegevus');
});

it('Should delete item from todo list', async () => {
    const token = await login(request);
    const id = await addItem(request, token);
    const wat = await request.delete(`/todo/${id}`).set('Authorization', `Bearer ${token.body.token}`);
    expect(wat.text).toBe('wat');
});

it('Should update state of item in todo list', async () => {
    const token = await login(request);
    const id = await addItem(request, token);
    const scared = await request.put(`/todo/${id}`).set('Authorization', `Bearer ${token.body.token}`);
    const item = await getToDoItem(id);
    expect(scared.text).toBe('aim scared');
    expect(item.state).toBe(1);
});

it('Should get todo list', async () => {
    const token = await login(request);
    await addItem(request, token);
    const todo = await getToDoList(request, token);
    expect(todo.body.length).not.toBe(0);
    expect(todo.body[0].title).toBe('tegevus');
    expect(todo.body[0].state).toBeFalsy();
});

it('Should update item title in todo list', async () => {
    const token = await login(request);
    const id = await addItem(request, token);
    const sometimes = await request.put(`/todo/update/${id}`)
                            .set('Authorization', `Bearer ${token.body.token}`)
                            .send({
                                title: 'tegevus!',
                            });
    const item = await getToDoItem(id);
    expect(sometimes.text).toBe('sometimes win');
    expect(item.title).toBe('tegevus!');
});

afterEach(async () => {
    await query('delete from users');
    await query('delete from todo');
});

afterAll(async () => {
    app.closePool();
    pool.end();
});