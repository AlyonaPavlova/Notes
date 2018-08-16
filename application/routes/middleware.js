const {Note} = require('../models/notes');
const {dbPromise} = require('../../db.js');

async function checkIdMiddleware (req, res, next) {
    const noteId = req.params.noteId;
    const db = await dbPromise;
    const author = await Note.getNoteAuthor(db, noteId);

    if (req.user.id === author.author_id) {
        return  next();
    }
    res.redirect('/');
}

module.exports = checkIdMiddleware;

