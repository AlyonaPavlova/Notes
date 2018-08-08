const {dbPromise} = require('../../app');
const {Notes} = require('../models/notes');

async function create (req, res, next) {
    try {
        const db = await dbPromise;
        Notes.create(db, req.body.body, req.params.id);
        res.redirect('/api/v1/user/note/:id');
    } catch (err) {
        next(err);
    }
}

async function readAllNotes (req, res, next) {
    try {
        const db = await dbPromise;
        const notes = Notes.readAllNotes(db);
        res.json(notes);
    } catch (err) {
        next(err);
    }
}

async function readPersonalNotes (req, res, next) {
    try {
        const db = await dbPromise;
        const notes = Notes.readPersonalNotes(db, req.params.id);
        res.json(notes);
    } catch (err) {
        next(err);
    }
}

async function readNote (req, res, next) {
    try {
        const db = await dbPromise;
        const note = Notes.readNote(db, req.params.id);
        res.json(note);
    } catch (err) {
        next(err);
    }
}

async function update (req, res, next) {
    try {
        const db = await dbPromise;
        Notes.update(db, req.body.body);
        res.redirect('/api/v1/user/notes/:id');
    } catch (err) {
        next(err);
    }
}

async function deleteNote (req, res, next) {
    try {
        const db = await dbPromise;
        Notes.delete(db, req.params.id);
        res.redirect('/api/v1/user/notes');
    } catch (err) {
        next(err);
    }
}

module.exports = {create, readAllNotes, readPersonalNotes, readNote, update, deleteNote};
