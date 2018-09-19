const redis = require('redis');
const client = redis.createClient({ host: 'redis' });

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

async function getLastTenNotes (req, res, next) {
    try {
        const db = await dbPromise;
        const notes = await Note.getLastTenNotes(db, req.user.id);
        res.send(notes);
    } catch (err) {
        next(err);
    }
}

async function getNumberNotesLikes (req, res, next) {
    try {
        const db = await dbPromise;
        const numberAllNotesLikes = await Note.getNumberNotesLikes(db, req.user.id);

        client.multi().select(1).zadd('likes', numberAllNotesLikes['count(*)'], req.user.id).exec();

        res.json(numberAllNotesLikes['count(*)']);
    } catch (err) {
        next(err);
    }
}

async function getNumberNotesLikesForLastTenNotes (req, res, next) {
    try {
        const db = await dbPromise;
        const numberAllNotesLikes = await Note.getNumberNotesLikesForLastTenNotes(db, req.user.id);

        client.multi().select(1).zadd('likesForTenNotes', numberAllNotesLikes['count(*)'], req.user.id).exec();

        res.json(numberAllNotesLikes['count(*)']);
    } catch (err) {
        next(err);
    }
}

async function getRating (req, res, next) {
    try {
        client.multi().select(1).zrevrange('likes', 0, 99).exec(function (err, idsArr) {
            idsArr[1].forEach(function (i, id) {
                if (+id === req.user.id) {
                    console.log('User rating ' + id + ' is ' + i);
                } else {
                    console.log('The user does not have enough likes to participate in the rating.');
                }
            });
        });
    } catch (err) {
        next(err);
    }
}

async function getRatingForLastTenNotes (req, res, next) {
    try {
        client.multi().select(1).zrevrange('likesForTenNotes', 0, 99).exec(function (err, idsArr) {
            idsArr[1].forEach(function (i, id) {
                if (+id === req.user.id) {
                    console.log('User rating ' + id + ' is ' + i);
                } else {
                    console.log('The user does not have enough likes to participate in the rating.');
                }
            });
        });
    } catch (err) {
        next(err);
    }
}

async function getRatingForLastTenNotes (req, res, next) {
    try {
        client.multi().select(1).zrevrange('likes', 0, 99).exec(function (err, idsArr) {
            idsArr[1].forEach(function (i, id) {
                if (+id === req.user.id) {
                    console.log('User rating ' + id + ' is ' + i);
                } else {
                    console.log('The user does not have enough likes to participate in the rating.');
                }
            });
        });
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

module.exports = {create, getAllNotes, getPersonalNotes, getNote, update, deleteNote, noteState, getNumberNotesLikes, getLastTenNotes, getRating, getNumberNotesLikesForLastTenNotes, getRatingForLastTenNotes};
