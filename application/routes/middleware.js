const {Note} = require('../models/notes');
const {dbPromise} = require('../../db.js');

async function checkIdMiddleware (req, res, next) {
    const db = await dbPromise;
    const author = await Note.getNoteAuthor(db, req.params.noteId);

    if (req.user.id === author.author_id) {
        console.log('CHECK ID SUCCESS');
        return  next();
    }
    console.log('ERROR CHECK ID');
    res.redirect('/');
}

module.exports = checkIdMiddleware;

