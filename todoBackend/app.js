const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

const pool = mysql.createPool({
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

app.use(cors());
app.use(express.json());

app.get('/todo', (req, res, next) => {
    pool.query('SELECT * from todo', (err, rows) => {
        if (err) {
            next(err);
        }

        const todo = [];
        for (const row of rows) {
            const state = row.state === 1;
            todo.push({ id: row.id, title: row.title, state });
        }
        res.send(todo);
    });
});

// add item to todo list
app.post('/todo', (req, res, next) => {
    pool.query('insert into todo set ?', req.body, (error, results) => {
        if (error) {
            next(error);
        }
        res.send(`${results.insertId}`);
    });
});

// delete item from todo list
app.delete('/todo/:id', (req, res, next) => {
    pool.query('delete from todo where id = ?', req.params.id, (error) => {
        if (error) {
            next(error);
        }
        res.send('wat');
    });
});

// update state of item in todo list
app.put('/todo/:id', (req, res, next) => {
    pool.query('update todo set state = not state where id = ?', req.params.id, (error) => {
        if (error) {
            next(error);
        }
        res.send('aim scared');
    });
});

app.get('/todo/tere', (req, res) => {
    res.send('tere tere vanakere, oled jõudnud saladuste laekani');
});

app.listen(port, () => console.log(`ToDo app listening at http://localhost:${port}`));
