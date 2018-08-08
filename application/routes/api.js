const express = require('express');
const api = express.Router();

const pages = require('../controllers/pages');
const Users = require('../controllers/usersController');
const Notes = require('../controllers/notesController');
const Tags = require('../controllers/tagsController');

api.get('/api/v1', function (req, res) {
    res.send('API is running');
});

api.route('/api/v1/users')
    .get(Users.readAllUsers)
    .post(Users.create);

api.route('/api/v1/users/:id')
    .get(Users.readUser)
    .put(Users.update)
    .delete(Users.deleteUser);

api.get('/api/v1/registration', pages.registration);
api.get('/api/v1/login', pages.login);

api.route('/api/v1/users/:id/notes')
    .get(Notes.readPersonalNotes)
    .post(Notes.create);

api.route('/api/v1/users/:id/notes/:id')
    .get(Notes.readNote)
    .put(Notes.update)
    .delete(Notes.deleteNote);

api.route('/api/v1/users/:id/notes/:id/tags')
    .get(Tags.readAllTags)
    .post(Tags.create);

api.route('/api/v1/users/:id/notes/:id/tags/:id')
    .put(Tags.update)
    .delete(Tags.deleteTag);

api.get('/api/v1/notes', Notes.readAllNotes);
api.get('/api/v1/notes/:id', Notes.readNote);

module.exports = {api};