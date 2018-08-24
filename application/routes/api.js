const express = require('express');
const api = express.Router();

const authenticationMiddleware = require('../authenticate/middleware');
const checkIdMiddleware = require('../routes/middleware');

const pages = require('../controllers/pages');
const Users = require('../controllers/usersController');
const Notes = require('../controllers/notesController');
const Tags = require('../controllers/tagsController');

// For Admin
api.get('/api/v1/users', Users.getAllUsers);

api.route('/api/v1/users/:userId')
    .get(Users.getUser)
    .put(Users.update)
    .delete(Users.deleteUser);

// For User
api.put('/api/v1/profile/update',
    authenticationMiddleware,
    Users.update);
api.delete('/api/v1/profile/delete',
    authenticationMiddleware,
    Users.deleteUser);

api.get('/api/v1/profile/notes',
    authenticationMiddleware,
    Notes.getPersonalNotes);

api.get('/api/v1/profile/notes/numberNotesLikes',
    authenticationMiddleware,
    Notes.getNumberNotesLikes);

api.route('/api/v1/profile/notes/new')
    .get(pages.newNote)
    .post(
        authenticationMiddleware,
        Notes.create
    );

api.route('/api/v1/profile/notes/:noteId')
    .get(Notes.getNote)
    .post(Notes.noteState)
    .put(
        authenticationMiddleware,
        checkIdMiddleware,
        Notes.update
    )
    .delete(
        authenticationMiddleware,
        checkIdMiddleware,
        Notes.deleteNote
    );

api.get('/api/v1/profile/notes/:noteId/tags', Tags.getAllTags);
api.post('/api/v1/profile/notes/:noteId/tags/new', Tags.create);

api.route('/api/v1/profile/notes/:noteId/tags/:tagId')
    .put(
        authenticationMiddleware,
        checkIdMiddleware,
        Tags.update
    )
    .delete(
        authenticationMiddleware,
        checkIdMiddleware,
        Tags.deleteTag
    );

// For All Users
api.get('/api/v1/notes', Notes.getAllNotes);
api.get('/api/v1/notes/:noteId', Notes.getNote);
api.get('/api/v1/notes/:noteId/tags', Tags.getAllTags);

module.exports = {api};