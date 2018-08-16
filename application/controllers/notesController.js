const {dbPromise} = require('../../db.js');
const {Note} = require('../models/notes');
const checkSessionMiddleware = require('../routes/middleware');
const authenticationMiddleware = require('../authenticate/middleware');

const date = new Date( Date.now());

async function create (req, res, next) {
    try {
        const db = await dbPromise;

        if (!req.body.body) {
            res.status(400);
            res.send('400: Note Not Created');
        }
        else {
            const note = await Note.create(db, req.body.body, req.params.noteId, date);
            res.status(201);
            res.send(note);
        }
    } catch (err) {
        next(err);
    }
}

async function getAllNotes (req, res, next) {
    try {
        const db = await dbPromise;
        const notes = await Note.getAllNotes(db);
        res.send(notes);
    } catch (err) {
        next(err);
    }
}

async function getPersonalNotes (req, res, next) {
    try {
        const db = await dbPromise;
        const notes = await Note.getPersonalNotes(db, req.params.noteId);
        res.send(notes);
    } catch (err) {
        next(err);
    }
}

async function getNote (req, res, next) {
    try {
        const db = await dbPromise;
        const note = await Note.getNote(db, req.params.noteId);

        if (!note) {
            res.status(404);
            res.send('404: Note Not Found');
        }
        res.send(note);
    } catch (err) {
        next(err);
    }
}

async function update (req, res, next) {
    try {
        const db = await dbPromise;
        await Note.update(db, req.body.body, req.params.noteId);
        res.send('The note has been successfully updated');
    } catch (err) {
        next(err);
    }
}

async function deleteNote (req, res, next) {
    try {
        const db = await dbPromise;
        const author = await Note.getNoteAuthor(db, req.params.noteId);

        if (+req.params.userId === author.author_id) {
            await Note.delete(db, req.params.noteId);
            res.send('The note has been successfully deleted');
        }
        else {
            res.status(403);
            res.send('You don\'t have sufficient access rights');
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {create, getAllNotes, getPersonalNotes, getNote, update, deleteNote};
