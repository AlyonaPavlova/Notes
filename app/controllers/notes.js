const express = require('express');
const dbPromise = require('../../app');
const router = express.Router;

router.get('/api/v1/notes', async function (req, res, next) {
    try {
        const db = await dbPromise;
        const notes = await Promise.all([
            db.all('SELECT * FROM note')
        ]);
        res.send(notes);
    } catch (err) {
        next(err);
    }
});

router.get('/api/v1/notes/:id', async function (req, res, next) {
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

module.exports = router;