const express = require('express');
const router = express.Router;

const pages = require(__dirname + './app/controllers/pages');
const Users = require('../controllers/usersController');
const Notes = require('../controllers/notesController');
const Tags = require('../controllers/tagsController');

router.get('/api/v1', function (req, res) {
    res.send('API is running');
});

// Available only for admin

router.get('/api/v1/user/users', Users.readAllUsers);
router.get('/api/v1/user/users/:id', Users.readUser);

// Registration

router.route('/api/v1/registration')
    .get(pages.registration)
    .post(Users.create);

// Login

router.get('/api/v1/login', pages.login);

// Account operations

router.put('/api/v1/user/update', Users.update);

router.delete('/api/v1/user/delete', Users.deleteUser);

// User can view all notes

router.get('/api/v1/user/notes', Notes.readAllNotes);

// User can view his notes

router.get('/api/v1/user/my-notes', Notes.readPersonalNotes);

// User can create a new note

router.route('/api/v1/user/my-notes/new')
    .get(pages.newNote)
    .post(Notes.create);

router.route('/api/v1/users/my-notes/:id')
    .get(Notes.readNote)
    .put(Notes.update)
    .delete(Notes.deleteNote);

router.get('/api/v1/notes', Notes.readAllNotes);

router.get('/api/v1/notes/:id', Notes.readNote);


router.get('/api/v1/notes/:id/tags', Tags.readAllTags);

router.route('/api/v1/user/notes/:id/tags/new')
    .get(pages.newTag)
    .post(Tags.create);

router.route('/api/v1/user/notes/:id/tags/:id')
    .put(Tags.update)
    .delete(Tags.deleteTag);

module.exports = router;