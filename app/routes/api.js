const express = require('express');
const dbPromise = require('../../app');
const router = express.Router;

const pages = require(__dirname + './app/controllers/pages');
const Users = require('../controllers/usersController');
const Notes = require('../controllers/notesController');
const Tags = require('../controllers/tagsController');

router.get('/api/v1', function (req, res) {
    res.send('API is running');
});

// Available only for admin

router.get('/api/v1/user/:id/users', async (req, res, next) => {
    try {
        const db = await dbPromise;
        const users = Users.readAllUsers(db);
        res.json(users);
    } catch (err) {
        next(err);
    }
});

// Registration

router.route('/api/v1/registration')
    .get(pages.registration)
    .post(async (req, res, next) => {
        try {
            const db = await dbPromise;
            const user = new Users;
            user.create(db, req.body.email, req.body.password, req.body.name, req.body.phone, req.body.birth_date);
            res.redirect('api/v1/user/:id/home');
        } catch (err) {
            next(err);
        }
    });

// Login

router.get('/api/v1/login', pages.login);

// Account

router.get('/api/v1/user/:id/account', async function (req, res, next) {
    try {
        const db = await dbPromise;
        const user = Users.readUser(db, req.params.id);
        res.json(user);
    } catch (err) {
        next(err);
    }
});

router.put('/api/v1/user/:id/account/update', async (req, res, next) => {
    try {
        const db = await dbPromise;
        // const user = Users.readUserId(db, req.body.id);
        Users.update(db, req.body.password, req.body.name, req.body.phone, req.body.birth_date);
        res.redirect('/home');
    } catch (err) {
        next(err);
    }
});

router.delete('/api/v1/user/:id/account/delete', async (req, res, next) => {
    try {
        const db = await dbPromise;
        Users.delete(db, req.params.id);
        res.redirect('/home');
    } catch (err) {
        next(err);
    }
});

// User can view all notes

router.get('/api/v1/user/:id/notes', async function (req, res, next) {
    try {
        const db = await dbPromise;
        const notes = Notes.readAllNotes(db);
        res.json(notes);
    } catch (err) {
        next(err);
    }
});

// User can only view his notes

router.get('/api/v1/user/:id/account/notes', async function (req, res, next) {
    try {
        const db = await dbPromise;
        const notes = Notes.readPersonalNotes(db, req.params.id);
        res.json(notes);
    } catch (err) {
        next(err);
    }
});

// User can create a new note

router.route('/api/v1/user/:id/notes/new')
    .get(pages.newNote)
    .post(async (req, res, next) => {
        try {
            const note = new Notes();
            note.create(req.body.body, req.params.id);
            res.redirect('/api/v1/user/:id/note/:id');
        } catch (err) {
            next(err);
        }
    });

router.route('/api/v1/users/:id/notes/:id')
    .get(async function (req, res, next) {
        try {
            const db = await dbPromise;
            const note = Notes.readNote(db, req.params.id);
            res.json(note);
        } catch (err) {
            next(err);
        }
    })
    .put(async (req, res, next) => {
        try {
            const db = await dbPromise;
            Notes.update(db, req.body.body);
            res.redirect('/api/v1/users/:id/notes/:id');
        } catch (err) {
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const db = await dbPromise;
            Notes.delete(db, req.params.id);
            res.redirect('/api/v1/users/:id/notes');
        } catch (err) {
            next(err);
        }
    });



router.get('/api/v1/notes', async function (req, res, next) {
    try {
        const db = await dbPromise;
        const notes = Notes.readAllNotes(db);
        res.json(notes);
    } catch (err) {
        next(err);
    }
});

router.get('/api/v1/notes/:id', async function (req, res, next) {
    try {
        const db = await dbPromise;
        const note = Notes.readNote(db, req.params.id);
        res.send(note);
    } catch (err) {
        next(err);
    }
});


router.get('/api/v1/notes/:id/tags', async function (req, res, next) {
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

router.route('/api/v1/users/:id/notes/:id/tags/new')
    .get(function (req, res) {
        res.send('./views/pages/note.ejs');
    })
    .post(async (req, res, next) => {
        try {
            const db = await dbPromise;
            const user_id = Users.readUserId(db, req.params.id);
            Notes.create(req.body.body, user_id);
            res.redirect('/home');
        } catch (err) {
            next(err);
        }
    });

router.route('/api/v1/users/:id/notes/:id/tags/:id')
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

module.exports = router;