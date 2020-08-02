const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
require('dotenv').config();

function signToken(id) {
    const payload = {
        sub: id,
        iat: Date.now()
    };
    
    return jsonwebtoken.sign(payload, process.env.PP_SECRET);
}

const opts = { 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PP_SECRET,
};

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    pool.query('SELECT * from users where id=?', jwt_payload.sub, (err, rows) => {
        if (err || rows.length === 0) {
            return done(null, false);
        } else {
            return done(null, rows[0]);
        }
    });
}));

const passportAuth = passport.authenticate('jwt', { session: false });

const pool = mysql.createPool({
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
const query = promisify(pool.query).bind(pool);

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/todo', passportAuth, (req, res, next) => {

    pool.query('SELECT * from todo where userId = ?', req.user.id, (err, rows) => {
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
app.post('/todo', passportAuth, (req, res, next) => {
    req.body.userId = req.user.id;
    pool.query('insert into todo set ?', req.body, (error, results) => {
        if (error) {
            next(error);
        }
        res.send(`${results.insertId}`);
    });
});

// delete item from todo list
app.delete('/todo/:id', passportAuth, (req, res, next) => {
    pool.query('delete from todo where id = ? and userId = ?', [req.params.id, req.user.id], (error) => {
        if (error) {
            next(error);
        }
        res.send('wat');
    });
});

// update state of item in todo list
app.put('/todo/:id', passportAuth, (req, res, next) => {
    pool.query('update todo set state = not state where id = ? and userId = ?', [req.params.id, req.user.id], (error) => {
        if (error) {
            next(error);
        }
        res.send('aim scared');
    });
});

app.get('/todo/tere', (req, res) => {
    res.send('tere tere vanakere, oled jõudnud saladuste laekani');
});

// login endpoint
app.post('/login', (req, res, next) => {
    pool.query('SELECT id, username, password from users where username=?', req.body.username, (err, rows) => {
        if (err) {
            next(err);
        }

        if (rows.length === 0) {
            res.send({ error: "sellist kasutajat ei leitud" });
            return;
        }

        bcrypt.compare(req.body.password, rows[0].password, (err, result) => {
            if (err) {
                next(err);
            }

            if (result) {      
                res.send({ token: signToken(rows[0].id) });
            } else {
                res.send({ error: 'salasõna pole küll see mis sa panid' });
            }
        });
    });
});

app.post('/register', async (req, res, next) => {
    try {
        const rows = await query('SELECT * from users where username = ?', req.body.username);
        if (rows.length !== 0) {
            res.send({ error: "kasutajanimi juba kasutusel"});
            return;
        } else {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            const results = await query('INSERT into users(username, password) values(?, ?)', [req.body.username, hash]);
            res.send({ token: signToken(results.insertId) });
        }
    } catch (error) {
        next(error);
    }
})

app.listen(port, () => console.log(`ToDo app listening at http://localhost:${port}`));
