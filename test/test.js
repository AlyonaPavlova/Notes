const chai = require('chai');
const expect = require('chai');
const asserttype = require('chai-asserttype');
const request = require('supertest');
const app = require('../server');

const router = require('../app/routes/index');

describe('GET pages', function () {
    this.timeout(5000);

    it('should contain text "Храните ваши заметки у нас. Легко и просто!"', function (done) {
        request(app)
            .get('/')
            .expect(/Храните ваши заметки у нас. Легко и просто!/, done());
    });

    it('should contain text "Features"', function (done) {
        request(router)
            .get('/features')
            .expect(/Features/, done());
    });

    it('should contain text "News"', function (done) {
        request(router)
            .get('/news')
            .expect(/News/, done());
    });
});

describe('Correct users returned', function () {
    this.timeout(5000);

    it('should return list of all users', function (done) {
        request(app)
            .get('/api/v1/users')
            .expect('Content-type', /json/)
            .expect(200, done());

    });

    it('should return a single user with id = 1', function (done) {
        request(app)
            .get('/api/v1/users/1')
            .expect('Content-type', /json/)
            .expect(200, done());
    });

    it('should be an object with keys and values', function (done) {
        request(app)
            .get('/api/v1/users/1')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.have.property("email");
                expect(res.body.email).to.not.equal(null);
                expect(res.body.email).to.include("@");
                expect(res.body).to.have.property("password");
                expect(res.body.password).to.not.equal(null);
                expect(res.body).to.have.property("name");
                expect(res.body.name).to.not.equal(null);
                expect(res.body).to.have.property("phone");
                expect(res.body).to.have.property("notes_count");
                expect(res.body).to.have.property("birth_date");
            });
        done();
    });
});

describe('Non-existing user', function () {
    it('should return user not found', function (done) {
        request(app)
            .get('/users/302')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect('"User not found"', done());
    });
});

describe('Create user', function () {
    let data = {
        "id": 1,
        "email": "admin@mail.ru",
        "password": "0000",
        "name": "Admin",
        "phone": "",
        "notes_count": 0,
        "birth_date": ""
    };
    it('respond with 201 created', function (done) {
        request(app)
            .post('/api/v1/users')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201, done());
    });
});

describe('Create user error', function () {
    let data = {
        "email": "admin@mail.ru",
        "password": "0000",
        "name": "Admin",
        "phone": "",
        "notes_count": 0,
        "birth_date": ""
    };
    it('respond with 400 not created', function (done) {
        request(app)
            .post('/api/v1/users')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect('"User not created"', done());
    });
});

describe('Correct notes returned', function () {
    this.timeout(5000);

    it('should return list of all notes', function (done) {
        request(app)
            .get('/api/v1/notes')
            .expect('Content-type', /json/)
            .expect(200, done());

    });

    it('should return a single note with id = 1', function (done) {
        request(app)
            .get('/api/v1/notes/1')
            .expect('Content-type', /json/)
            .expect(200, done());
    });

    it('should be an object with keys and values', function (done) {
        request(app)
            .get('/api/v1/notes/1')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.have.property("body");
                expect(res.body.body).to.not.equal(null);
                expect(res.body).to.have.property("author_id");
                expect(res.body.author_id).to.not.equal(null);
                expect(res.body.author_id).to.be.a.number();
                expect(res.body).to.have.property("creation_date");
                expect(res.body.creation_date).to.not.equal(null);
                expect(res.body.creation_date).to.be.date();
                expect(res.body).to.have.property("tags_count");
            });
        done();
    });
});

describe('Correct notes returned for one user', function () {
    this.timeout(5000);

    it('should return list of all notes for one user', function (done) {
        request(app)
            .get('/api/v1/users/:id/notes')
            .expect('Content-type', /json/)
            .expect(200, done());

    });

    it('should return a single note with id = 1', function (done) {
        request(app)
            .get('/api/v1/users/:id/notes/:id')
            .expect('Content-type', /json/)
            .expect(200, done());
    });
});

describe('Create note', function () {
    let data = {
        "id": 1,
        "body": "note's body",
        "author_id": 1,
        "creation_date": "",
        "tags_count": 2
    };
    it('respond with 201 created', function (done) {
        request(app)
            .post('/api/v1/users/:id/notes')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201, done());
    });
});

describe('Create note error', function () {
    let data = {
        "body": "note's body",
        "author_id": 1,
        "creation_date": "",
        "tags_count": 2
    };
    it('respond with 400 not created', function (done) {
        request(app)
            .post('/api/v1/users/:id/notes')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect('"Note not created"', done());
    });
});


