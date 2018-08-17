const express = require('express');
const passport = require('passport');
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
api.put('/api/v1/profile/update', Users.update);
api.delete('/api/v1/profile/delete', Users.deleteUser);

api.get('/api/v1/profile/notes', Notes.getPersonalNotes);
api.route('/api/v1/profile/notes/new')
    .get(pages.newNote)
    .post(Notes.create);

api.route('/api/v1/profile/notes/:noteId')
    .get(Notes.getNote)
    .put(
        passport.authenticate('local-login'),
        authenticationMiddleware,
        checkIdMiddleware,
        Notes.update
    )
    .delete(
        passport.authenticate('local-login'),
        authenticationMiddleware,
        checkIdMiddleware,
        Notes.deleteNote
    );

api.get('/api/v1/profile/notes/:noteId/tags', Tags.getAllTags);
api.post('/api/v1/profile/notes/:noteId/tags/new', Tags.create);

api.route('/api/v1/profile/notes/:noteId/tags/:tagId')
    .put(Tags.update)
    .delete(Tags.deleteTag);

// For All Users
api.get('/api/v1/notes', Notes.getAllNotes);
api.get('/api/v1/notes/:noteId', Notes.getNote);
api.get('/api/v1/notes/:noteId/tags', Tags.getAllTags);

module.exports = {api};