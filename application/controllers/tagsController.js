const {dbPromise} = require('../../db.js');
const {Tag} = require('../models/tags');

async function create (req, res, next) {
    try {
        const db = await dbPromise;

        if (!req.body.body) {
            res.status(400);
            res.send('400: Note Not Created');
        }
        else {
            const tag = await Tag.create(db, req.body.body, req.params.id);
            res.status(201);
            res.send(tag);
        }
    } catch (err) {
        next(err);
    }
}

async function readAllTags (req, res, next) {
    try {
        const db = await dbPromise;
        const tags = await Tag.readAllTags(db, req.params.id);
        res.send(tags);
    } catch (err) {
        next(err);
    }
}

async function update (req, res, next) {
    try {
        const db = await dbPromise;
        const tag = Tag.update(db, req.body.body, req.params.id);
        res.send(tag);
    } catch (err) {
        next(err);
    }
}

async function deleteTag (req, res, next) {
    try {
        const db = await dbPromise;
        await Tag.delete(db, req.params.id);
        res.send('Tag has been deleted');
    } catch (err) {
        next(err);
    }
}

module.exports = {create, readAllTags, update, deleteTag};
