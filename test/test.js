const chai = require('chai');
const expect = chai.expect;
const asserttype = require('chai-asserttype');
const request = require('supertest');
const {app} = require('../app');

describe('GET requests', function () {
    this.timeout(5000);

    describe('Main pages', function () {
        it('should contain text "Храните ваши заметки у нас. Легко и просто!"', function (done) {
            request(app.listen())
                .get('/home')
                .expect(200)
                .end(function (err, res) {
                    expect(res.text).to.include("Храните ваши заметки у нас. Легко и просто!", done(err));
                });
        });

        it('should contain text "Features"', function (done) {
            request(app.listen())
                .get('/features')
                .expect(200)
                .end(function (err, res) {
                    expect(res.text).to.include("Features", done(err));
                });
        });

        it('should contain text "News"', function (done) {
            request(app.listen())
                .get('/news')
                .expect(200)
                .end(function (err, res) {
                    expect(res.text).to.include("News", done(err));
                });
        });
    });

    describe('API', function () {
        describe('Users', function () {
            describe('Correct users returned', function () {
                it('should return list of all users', function (done) {
                    request(app.listen())
                        .get('/api/v1/users')
                        .expect('Content-type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            expect(res.body).to.be.an('array', done(err));
                        });
                });

                it('should return one user with id = 1, should be an object with keys and values', function (done) {
                    request(app.listen())
                        .get('/api/v1/users/1')
                        .expect('Content-type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            expect(res.body).to.have.property('id');
                            expect(res.body.id).to.equal(1);
                            expect(res.body).to.have.property('email');
                            expect(res.body.email).to.equal('admin@mail.ru');
                            expect(res.body).to.have.property('password');
                            expect(res.body.password).to.equal('0000');
                            expect(res.body).to.have.property('name');
                            expect(res.body.name).to.equal('Admin');
                            expect(res.body).to.have.property('phone');
                            expect(res.body.phone).to.equal(null);
                            expect(res.body).to.have.property('notes_count');
                            expect(res.body.notes_count).to.equal(null);
                            expect(res.body).to.have.property('birth_date');
                            expect(res.body.birth_date).to.equal(null);
                        });
                    done();
                });
            });
            describe('Non-existing user', function () {
                it('should return user not found', function (done) {
                    request(app.listen())
                        .get('/api/v1/users/302')
                        .expect(404)
                        .expect('404: User Not Found', done);
                });
            });
        });
        describe('Notes', function () {
            describe('Correct notes returned', function () {
                it('should return list of all notes', function (done) {
                    request(app.listen())
                        .get('/api/v1/notes')
                        .expect('Content-type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            expect(res.body).to.be.an('array', done(err));
                        });

                });

                it('should return one note, should be an object with keys and values', function (done) {
                    request(app.listen())
                        .get('/api/v1/notes/1')
                        .expect('Content-type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            expect(res.body).to.have.property('body');
                            expect(res.body.body).to.not.equal(null);
                            expect(res.body).to.have.property('author_id');
                            expect(res.body.author_id).to.not.equal(null);
                            expect(res.body.author_id).to.be.a.number();
                            expect(res.body).to.have.property('creation_date');
                            expect(res.body.creation_date).to.not.equal(null);
                            expect(res.body.creation_date).to.be.date();
                            expect(res.body).to.have.property('tags_count');
                        });
                    done();
                });
            });

            describe('Correct notes returned for one user', function () {
                it('should return list of all notes for one user', function (done) {
                    request(app.listen())
                        .get('/api/v1/users/1/notes')
                        .expect('Content-type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            expect(res.body).to.be.an('array', done(err));
                        });

                });

                it('should return one note with id = 1 for one user', function (done) {
                    request(app.listen())
                        .get('/api/v1/users/1/notes/1')
                        .expect('Content-type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            expect(res.body).to.have.property('body');
                            expect(res.body.body).to.not.equal(null);
                            expect(res.body).to.have.property('author_id');
                            expect(res.body.author_id).to.not.equal(null);
                            expect(res.body).to.have.property('creation_date');
                            expect(res.body.creation_date).to.not.equal(null);
                            expect(res.body).to.have.property('tags_count');
                        });
                    done();
                });
            });
        });
        describe('Tags', function () {
            describe('Correct tags returned', function () {
                it('should return list of all tags', function (done) {
                    request(app.listen())
                        .get('/api/v1/notes/1/tags')
                        .expect('Content-type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            expect(res.body).to.be.an('array', done(err));
                        });
                });
            });

        });
    });
});

describe('POST requests', function () {
    this.timeout(5000);

    describe('Users', function () {
        describe('Create user', function () {
            let data = {
                "email": "mail@mail.ru",
                "password": "1111",
                "name": "Name",
                "phone": "11111",
                "birth_date": "10.04.96"
            };
            it('respond with 201 created', function (done) {
                request(app.listen())
                    .post('/api/v1/users')
                    .send(data)
                    .expect(201, done);
            });
        });

        describe('Create user error', function () {
            let data = {
                "password": "1111",
                "name": "Name",
                "phone": "",
                "notes_count": 0,
                "birth_date": ""
            };
            it('respond with 400 not created', function (done) {
                request(app.listen())
                    .post('/api/v1/users')
                    .send(data)
                    .expect(400)
                    .expect('400: User Not Created', done);
            });
        });
    });
    describe('Notes', function () {
        describe('Create note', function () {
            let data = {
                "body": "note's body"
            };
            it('respond with 201 created', function (done) {
                request(app.listen())
                    .post('/api/v1/users/:id/notes')
                    .send(data)
                    .expect(201, done);
            });
        });

        describe('Create note error', function () {
            let data = {};
            it('respond with 400 not created', function (done) {
                request(app.listen())
                    .post('/api/v1/users/:id/notes')
                    .send(data)
                    .expect(400)
                    .expect('400: Note Not Created', done);
            });
        });
    });
    describe('Tags', function () {
        describe('Create tag', function () {
            let data = {
                "body": "bodyTag"
            };
            it('respond with 201 created', function (done) {
                request(app.listen())
                    .post('/api/v1/users/:id/notes/:id/tags')
                    .send(data)
                    .expect(201, done);
            });
        });
    });
});

describe('PUT requests', function () {
    this.timeout(5000);

    describe('Users', function () {
        describe('Update user', function () {
            let data = {
                "password": "newPassword",
                "name": "newName",
                "phone": "newPhone",
                "birth_date": "newDate"
            };
            it('respond with 200 updated', function (done) {
                request(app.listen())
                    .put('/api/v1/users/2')
                    .send(data)
                    .expect(200, done);
            });
        });
    });

    describe('Notes', function () {
        describe('Update note', function () {
            let data = {
                "body": "newBody"
            };
            it('respond with 200 updated', function (done) {
                request(app.listen())
                    .put('/api/v1/users/:id/notes/1')
                    .send(data)
                    .expect(200, done);
            });
        });
    });

    describe('Tags', function () {
        describe('Update tag', function () {
            let data = {
                "body": "newBody"
            };
            it('respond with 200 updated', function (done) {
                request(app.listen())
                    .put('/api/v1/users/:id/notes/:id/tags/1')
                    .send(data)
                    .expect(200, done);
            });
        });
    });
});

describe('DELETE requests', function () {
    describe('Users', function () {
        describe('Delete user', function () {
            it('respond with 200 deleted', function (done) {
                request(app.listen())
                    .delete('/api/v1/users/2')
                    .expect(200, done);
            });
        });
    });

    describe('Notes', function () {
        describe('Delete note', function () {
            it('respond with 200 deleted', function (done) {
                request(app.listen())
                    .delete('/api/v1/users/1/notes/1')
                    .expect(200, done);
            });
        });
    });

    describe('Tags', function () {
        describe('Delete tag', function () {
            it('respond with 200 deleted', function (done) {
                request(app.listen())
                    .delete('/api/v1/users/:id/notes/:id/tags/1')
                    .expect(200, done);
            });
        });
    });
});


