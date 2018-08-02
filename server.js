const app = require(__dirname + './app/main');
const dbPromise = require('./app');
const port = process.env.PORT || 3000;

app.get('/api/v1', function (req, res) {
    res.send('API is running');
});

app.get('/api/v1/users', async (req, res, next) => {
    try {
        const db = await dbPromise;
        const users = await Promise.all([
            db.all('SELECT * FROM user')
        ]);
        res.json(users);
    } catch (err) {
        next(err);
    }
});

app.route('/api/v1/users/new')
    .get(function (req, res) {
        res.send('./views/pages/new-user.ejs');
    })
    .post(async (req, res, next) => {
        try {
            const db = await dbPromise;
            db.run('INSERT INTO user(id, email, password, name, phone, notes_count, birth_date) VALUES ("' +
                req.body.id + '","' + req.body.email + '","' + req.body.password + '","' + req.body.name + '","' +
                req.body.phone + '","' + req.body.notes_count + '","' + req.body.birth_date + '")');
            res.redirect('/home');
        } catch (err) {
            next(err);
        }
    });

app.route('/api/v1/users/:id')
    .get(async function (req, res, next) {
        try {
            const db = await dbPromise;
            const user = await Promise.all([
                db.get('SELECT * FROM user WHERE id = ?', req.params.id),
            ]);
            res.send(user);
        } catch (err) {
            next(err);
        }
    })
    .put(async (req, res, next) => {
        try {
            const db = await dbPromise;
            db.run('UPDATE user SET password = req.body.password, name = req.body.name, phone = req.body.phone, birth_date = req.body.birth_date');
            res.redirect('/home');
        } catch (err) {
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const db = await dbPromise;
            db.run('DELETE FROM user WHERE id = ?', req.params.id);
            res.redirect('/home');
        } catch (err) {
            next(err);
        }
    });

app.get('/api/v1/users/:id/notes', async function (req, res, next) {
    try {
        const db = await dbPromise;
        const [users, notes] = await Promise.all([
            db.get('SELECT * FROM user WHERE id = ?', req.params.id),
            db.all('SELECT * FROM note')
        ]);
        res.render('users', { users, notes });
    } catch (err) {
        next(err);
    }
});


app.route('/api/v1/users/:id/notes/new')
    .get(function (req, res) {
        res.send('./views/pages/new-note.ejs');
    })
    .post(async (req, res, next) => {
        try {
            const db = await dbPromise;
            const user = await Promise.all([
                db.get('SELECT * FROM user WHERE id = ?', req.params.id),
            ]);
            db.run('INSERT INTO note(id, body, author_id) VALUES ("' + req.body.id + '","' + req.body.body + '","' + user + '")');
            res.redirect('/home');
        } catch (err) {
            next(err);
        }
    });

app.get('/api/v1/notes/:id', async function (req, res, next) {
    try {
        const db = await dbPromise;
        const note = await Promise.all([
            db.get('SELECT * FROM note WHERE id = ?', req.params.id)
        ]);
        res.send(note);
    } catch (err) {
        next(err);
    }
});

app.route('/api/v1/users/:id/notes/:id')
    .get(async function (req, res, next) {
        try {
            const db = await dbPromise;
            const note = await Promise.all([
                db.get('SELECT * FROM note WHERE id = ?', req.params.id),
            ]);
            res.send(note);
        } catch (err) {
            next(err);
        }
    })
    .put(async (req, res, next) => {
        try {
            const db = await dbPromise;
            db.run('UPDATE note SET body = req.body.body');
            res.redirect('/home');
        } catch (err) {
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const db = await dbPromise;
            db.run('DELETE FROM note WHERE id = ?', req.params.id);
            res.redirect('/home');
        } catch (err) {
            next(err);
        }
    });

app.get('/api/v1/notes/:id/tags', async function (req, res, next) {
    try {
        const db = await dbPromise;
        const tags = await Promise.all([
            db.all('SELECT * FROM tag')
        ]);
        res.send(tags);
    } catch (err) {
        next(err);
    }
});

app.route('/api/v1/users/:id/notes/:id/tags/:id')
    .get(async function (req, res, next) {
        try {
            const db = await dbPromise;
            const tag = await Promise.all([
                db.all('SELECT * FROM tag WHERE id = ?', req.params.id)
            ]);
            res.send(tag);
        } catch (err) {
            next(err);
        }
    })
    .put(async (req, res, next) => {
        try {
            const db = await dbPromise;
            db.run('UPDATE tag SET body = req.body.body');
            res.redirect('/home');
        } catch (err) {
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const db = await dbPromise;
            db.run('DELETE FROM tag WHERE id = ?', req.params.id);
            res.redirect('/home');
        } catch (err) {
            next(err);
        }
    });

app.listen(port, function () {
    console.log('App listening on port 3000!');
});