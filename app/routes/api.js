const express = require('express');
const router = express.Router();

const pages = require('../controllers/pages');
const Users = require('../controllers/usersController');
const Notes = require('../controllers/notesController');
const Tags = require('../controllers/tagsController');

router.get('/api/v1', function (req, res) {
    res.send('API is running');
});

router.route('/api/v1/users')
    .get(Users.readAllUsers)
    .post(Users.create);

router.route('/api/v1/users/:id')
    .get(Users.readUser)
    .put(Users.update)
    .delete(Users.deleteUser);

router.get('/api/v1/registration', pages.registration);
router.get('/api/v1/login', pages.login);

router.route('/api/v1/users/:id/notes')
    .get(Notes.readPersonalNotes)
    .post(Notes.create);

router.route('/api/v1/users/:id/notes/:id')
    .get(Notes.readNote)
    .put(Notes.update)
    .delete(Notes.deleteNote);

router.route('/api/v1/users/:id/notes/:id/tags')
    .get(Tags.readAllTags)
    .post(Tags.create);

router.route('/api/v1/users/:id/notes/:id/tags/:id')
    .put(Tags.update)
    .delete(Tags.deleteTag);

router.get('/api/v1/notes', Notes.readAllNotes);
router.get('/api/v1/notes/:id', Notes.readNote);

module.exports = router;