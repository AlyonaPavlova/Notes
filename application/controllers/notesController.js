const {dbPromise} = require('../../db.js');
const {Note} = require('../models/notes');

const date = new Date( Date.now());

async function create (req, res, next) {
    try {
        const db = await dbPromise;

        if (!req.body.body) {
            res.status(400);
            res.send('400: Note Not Created');
        }
        else {
            const note = await Note.create(db, req.body.body, req.params.id, date);
            res.status(201);
            res.send(note);
        }
    } catch (err) {
        next(err);
    }
}

async function readAllNotes (req, res, next) {
    try {
        const db = await dbPromise;
        const notes = await Note.readAllNotes(db);
        res.send(notes);
    } catch (err) {
        next(err);
    }
}

async function readPersonalNotes (req, res, next) {
    try {
        const db = await dbPromise;
        const notes = await Note.readPersonalNotes(db, req.params.id);
        res.send(notes);
    } catch (err) {
        next(err);
    }
}

async function readNote (req, res, next) {
    try {
        const db = await dbPromise;
        const note = await Note.readNote(db, req.params.id);

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
        const note = await Note.update(db, req.body.body, req.params.id);
        res.send(note);
    } catch (err) {
        next(err);
    }
}

async function deleteNote (req, res, next) {
    try {
        const db = await dbPromise;
        await Note.delete(db, req.params.id);
        res.send('Your note has been deleted!');
    } catch (err) {
        next(err);
    }
}

module.exports = {create, readAllNotes, readPersonalNotes, readNote, update, deleteNote};
