const redis = require('redis');
const client = redis.createClient();

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
    } catch (err) {
        next(err);
    }
}

async function getNumberNotesLikes (req, res, next) {
    try {
        const db = await dbPromise;
        const notes = await Note.getPersonalNotes(db, req.user.id);

        let numberOneNoteLikes = 0;
        let numberAllNotesLikes = 0;

        for (let i = 0; i < notes.length; i++) {
            let oneNoteArr = await Note.getAllVotes(db, notes[i].id);
            let oneNoteWithLikeArr = oneNoteArr.filter(function (item) {
                return item.state === 1;
            });
            numberOneNoteLikes = oneNoteWithLikeArr.length;
            numberAllNotesLikes += numberOneNoteLikes;
        }

        client.set(req.user.id, numberAllNotesLikes, function (err) {
            if (err) {
                console.log('Error: ' + err);
                client.quit();
            }
            else {
                client.get(req.user.id, function (err, value) {
                    client.quit();
                    if (err) {
                        console.log('Error: ' + err);
                    }
                    else if (value) {
                        console.log('Key (user.id): ' + req.user.id);
                        console.log('Value (number of notes like): ' + value);
                    }
                    else  {
                        console.log('Key not found');
                    }
                });
            }
        });

        res.json(numberAllNotesLikes);
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

module.exports = {create, getAllNotes, getPersonalNotes, getNote, update, deleteNote, noteState, getNumberNotesLikes};
