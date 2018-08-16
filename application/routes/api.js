const express = require('express');
const api = express.Router();

const Users = require('../controllers/usersController');
const Notes = require('../controllers/notesController');
const Tags = require('../controllers/tagsController');

api.get('/api/v1', function (req, res) {
    res.send('API is running');
});

api.route('/api/v1/users')
    .get(Users.getAllUsers)
    .post(Users.create);

api.route('/api/v1/users/:userId')
    .get(Users.getUser)
    .put(Users.update)
    .delete(Users.deleteUser);

api.route('/api/v1/users/:userId/notes')
    .get(Notes.getPersonalNotes)
    .post(Notes.create);

api.route('/api/v1/users/:userId/notes/:noteId')
    .get(Notes.getNote)
    .put(Notes.update)
    .delete(Notes.deleteNote);

api.route('/api/v1/users/:userId/notes/:noteId/tags')
    .get(Tags.getAllTags)
    .post(Tags.create);

api.route('/api/v1/users/:userId/notes/:noteId/tags/:tagId')
    .put(Tags.update)
    .delete(Tags.deleteTag);

api.get('/api/v1/notes', Notes.getAllNotes);
api.get('/api/v1/notes/:noteId', Notes.getNote);

module.exports = {api};