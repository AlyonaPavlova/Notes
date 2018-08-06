const dbPromise = require('../../app');
const Tags = require('../models/tags');

async function create (req, res, next) {
    try {
        const db = await dbPromise;
        Tags.create(db, req.body.body);
        res.redirect('/api/v1/user/notes/:id/tags');
    } catch (err) {
        next(err);
    }
}

async function readAllTags (req, res, next) {
    try {
        const db = await dbPromise;
        const tags = Tags.readAllTags(db);
        res.json(tags);
    } catch (err) {
        next(err);
    }
}

async function update (req, res, next) {
    try {
        const db = await dbPromise;
        Tags.update(db, req.body.body);
        res.redirect('/api/v1/user/notes/:id/tags');
    } catch (err) {
        next(err);
    }
}

async function deleteTag (req, res, next) {
    try {
        const db = await dbPromise;
        Tags.delete(db, req.params.id);
        res.redirect('/api/v1/user/notes/:id/tags');
    } catch (err) {
        next(err);
    }
}

module.exports = {create, readAllTags, update, deleteTag};
