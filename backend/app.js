const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');

function signToken(id) {
    const payload = {
        sub: id,
        iat: Date.now(),
    };

    return jsonwebtoken.sign(payload, process.env.PP_SECRET);
}

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PP_SECRET,
};

const pool = mysql.createPool({
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
const query = promisify(pool.query).bind(pool);

passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
        const rows = await query('SELECT * from users where id=?', jwtPayload.sub);
        if (rows.length === 0) {
            return done(null, false);
        }
        return done(null, rows[0]);
    } catch (error) {
        return done(null, false);
    }
}));

const passportAuth = passport.authenticate('jwt', { session: false });

const app = express();

app.use(cors());
app.use(express.json());

// get todo list
app.get('/todo', passportAuth, async (req, res, next) => {
    try {
        const rows = await query('SELECT * from todo where userId = ?', req.user.id);
        const todo = [];
        for (const row of rows) {
            const state = row.state === 1;
            todo.push({ id: row.id, title: row.title, state });
        }
        res.send(todo);
    } catch (error) {
        next(error);
    }
});

// add item to todo list
app.post('/todo', passportAuth, async (req, res, next) => {
    req.body.userId = req.user.id;
    try {
        const results = await query('insert into todo set ?', req.body);
        res.send(`${results.insertId}`);
    } catch (error) {
        next(error);
    }
});

// delete item from todo list
app.delete('/todo/:id', passportAuth, async (req, res, next) => {
    try {
        await query('delete from todo where id = ? and userId = ?', [req.params.id, req.user.id]);
        res.send('wat');
    } catch (error) {
        next(error);
    }
});

// update state of item in todo list
app.put('/todo/:id', passportAuth, async (req, res, next) => {
    try {
        await query('update todo set state = not state where id = ? and userId = ?', [req.params.id, req.user.id]);
        res.send('aim scared');
    } catch (error) {
        next(error);
    }
});

app.get('/todo/tere', (req, res) => {
    res.send('tere tere vanakere, oled jõudnud saladuste laekani');
});

// update item title in todo list
app.put('/todo/update/:id', passportAuth, async (req, res, next) => {
    try {
        await query('update todo set title = ? where id = ? and userId = ?', [req.body.title, req.params.id, req.user.id]);
        res.send('sometimes win');
    } catch (error) {
        next(error);
    }
});

// login
app.post('/login', async (req, res, next) => {
    try {
        const rows = await query('SELECT id, username, password from users where username=?', req.body.username);
        if (rows.length === 0) {
            res.send({ error: 'sellist kasutajat ei leitud' });
            return;
        }

        const result = await bcrypt.compare(req.body.password, rows[0].password);
        if (result) {
            res.send({ token: signToken(rows[0].id) });
        } else {
            res.send({ error: 'sisselogimine ebaõnnestus' });
        }
    } catch (error) {
        next(error);
    }
});

// register
app.post('/register', async (req, res, next) => {
    try {
        const rows = await query('SELECT * from users where username = ?', req.body.username);
        if (rows.length !== 0) {
            res.send({ error: 'kasutajanimi juba kasutusel' });
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const results = await query('INSERT into users(username, password) values(?, ?)', [req.body.username, hash]);
        res.send({ token: signToken(results.insertId) });
    } catch (error) {
        next(error);
    }
});

app.use(express.static('../frontend/dist'));

function closePool() {
    pool.end();
}

module.exports = { app: app, closePool: closePool };