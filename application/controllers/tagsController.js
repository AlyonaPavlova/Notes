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
            const tag = await Tag.create(db, req.body.body, req.params.noteId);
            res.status(201);
            res.send(tag);
        }
    } catch (err) {
        next(err);
    }
}

async function getAllTags (req, res, next) {
    try {
        const db = await dbPromise;
        const tags = await Tag.getAllTags(db, req.params.noteId);
        res.send(tags);
    } catch (err) {
        next(err);
    }
}

async function getPersonalTags (req, res, next) {
    try {
        const db = await dbPromise;
        const tags = await Tag.getPersonalTags(db, req.user.id);
        res.send(tags);
    } catch (err) {
        next(err);
    }
}

async function update (req, res, next) {
    try {
        const db = await dbPromise;
        const tag = Tag.update(db, req.body.body, req.params.tagId);
        res.send(tag);
    } catch (err) {
        next(err);
    }
}

async function deleteTag (req, res, next) {
    try {
        const db = await dbPromise;
        await Tag.delete(db, req.params.tagId);
        res.send('Tag has been deleted');
    } catch (err) {
        next(err);
    }
}

module.exports = {create, getAllTags, getPersonalTags, update, deleteTag};
