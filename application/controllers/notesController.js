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
            await Note.create(db, req.body.body, req.user.id, date);
            res.send('The note has been successfully created');
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
        const notes = await Note.getPersonalNotes(db, req.user.id);
        res.send(notes);
        console.log(notes);
    } catch (err) {
        next(err);
    }
}

async function getNotesWithLikes (req, res, next) {
    try {
        const db = await dbPromise;
        const notes = getPersonalNotes;
        let notesWithLikes = [];

        notes.forEach(async function (note) {
            const noteId = await Note.getNoteIdWithLike(db, note.id);
            const noteWithLike = await Note.getNote(db, noteId);
            notesWithLikes.push(noteWithLike);
        });

        res.send(notesWithLikes);
    } catch (err) {
        next(err);
    }
}

async function getNumberNotesWithLikes (req, res, next) {
    try {
        const numberNotes = getNotesWithLikes.length;
        res.send(numberNotes);
    } catch {
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
        res.render('pages/notes-list.ejs', {
            note : note
        });
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
        await Note.delete(db, req.params.noteId);
        res.send('The note has been successfully deleted');
    } catch (err) {
        next(err);
    }
}

async function noteState (req, res, next) {
    try {
        getNote;
        let state;

        if (req.body.true === undefined) {
            state = 0;
        }
        else {
            state = 1;
        }
        const db = await dbPromise;
        await Note.noteState(db, state, req.params.noteId);

        const note = await Note.getNote(db, req.params.noteId);
        res.render('pages/notes-list.ejs', {
            note : note
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {create, getAllNotes, getPersonalNotes, getNote, update, deleteNote, noteState, getNotesWithLikes, getNumberNotesWithLikes};
