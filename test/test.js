const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const superagent = require('superagent');

const {app} = require('../app');

describe('GET requests', function () {
    this.timeout(5000);

    describe('Main pages', function () {
        it('should contain text "Храните ваши заметки у нас. Легко и просто!"', function (done) {
            request(app)
                .get('/home')
                .expect(200)
                .end(function (err, res) {
                    expect(res.text).to.include('Храните ваши заметки у нас. Легко и просто!');
                    done(err);
                });
        });

        it('should contain text "Features"', function (done) {
            request(app)
                .get('/features')
                .expect(200)
                .end(function (err, res) {
                    expect(res.text).to.include('Features');
                    done(err);
                });
        });

        it('should contain text "News"', function (done) {
            request(app)
                .get('/news')
                .expect(200)
                .end(function (err, res) {
                    expect(res.text).to.include('News');
                    done(err);
                });
        });
        it('should return signup page', function (done) {
            request(app)
                .get('/signup')
                .expect('Content-type', 'text/html; charset=utf-8')
                .expect(200)
                .end(function (err, res) {
                    expect(res.text).to.include('Signup');
                    done(err);
                });
        });
    });

    describe('API', function () {
        describe('Users', function () {
            describe('Correct users returned', function () {
                it('should return list of all users', function (done) {
                    request(app)
                        .get('/api/v1/users')
                        .expect('Content-type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            expect(res.body).to.be.an('array');
                            done(err);
                        });
                });

                it('should return one user with id = 1, should be an object with keys and values', function (done) {
                    request(app)
                        .get('/api/v1/users/1')
                        .expect('Content-type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            expect(res.body).to.have.property('id');
                            expect(res.body.id).to.equal(1);
                            expect(res.body).to.have.property('email');
                            expect(res.body.email).to.equal('admin@mail.ru');
                            expect(res.body).to.have.property('password');
                            expect(res.body.password).to.not.equal(null);
                            expect(res.body).to.have.property('name');
                            expect(res.body.name).to.equal('Admin');
                            expect(res.body).to.have.property('phone');
                            expect(res.body).to.have.property('notes_count');
                            expect(res.body.notes_count).to.equal(0);
                            expect(res.body).to.have.property('birth_date');
                            done(err);
                        });
                });
            });
            describe('Non-existing user', function () {
                it('should return user not found', function (done) {
                    request(app)
                        .get('/api/v1/users/302')
                        .expect(404)
                        .expect('404: User Not Found', done);
                });
            });
        });
        describe('Notes', function () {
            describe('Correct notes returned', function () {
                it('should return list of all notes', function (done) {
                    request(app)
                        .get('/api/v1/notes')
                        .expect('Content-type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            expect(res.body).to.be.an('array');
                            done(err);
                        });
                });

                it('should return one note, should be an object with keys and values', function (done) {
                    request(app)
                        .get('/api/v1/notes/1')
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
                            done(err);
                        });
                });
            });

            describe('Correct notes returned for one user', function () {
                let data = {
                    'email': 'admin@mail.ru',
                    'password': '0000'
                };
                it('should return list of all notes for one user', function (done) {
                    request(app)
                        .get('/api/v1/profile/notes')
                        .send(data)
                        .expect('Content-type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            expect(res.body).to.be.an('array');
                            done(err);
                        });
                });

                it('should return one note with id = 1 for one user', function (done) {
                    let data = {
                        'email': 'admin@mail.ru',
                        'password': '0000'
                    };
                    request(app)
                        .get('/api/v1/profile/notes/1')
                        .send(data)
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
                            done(err);
                        });
                });
            });
        });
        describe('Tags', function () {
            describe('Correct tags returned', function () {
                it('should return list of all tags', function (done) {
                    request(app)
                        .get('/api/v1/notes/1/tags')
                        .expect('Content-type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            expect(res.body).to.be.an('array');
                            done(err);
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
                'email': 'mail@mail.ru',
                'password': '1111',
                'name': 'Name',
                'phone': '11111',
                'birth_date': '10.04.96'
            };
            it('respond with 201 created', function (done) {
                request(app)
                    .post('/signup')
                    .send(data)
                    .expect(201, done);
            });
        });

        describe('Create user error', function () {
            let data = {
                'password': '1111',
                'name': 'Name',
            };
            it('respond with 400 not created', function (done) {
                const agent = superagent.agent(app);

                agent.post('http://localhost:3000/signup')
                    .send(data)
                    .then(res => {
                        expect(res.text).to.include('Please, enter your email');
                        done();
                    })
                    .catch(err => {
                        throw err;
                    });
            });
        });
    });
    describe('Notes', function () {
        describe('Create note', function () {
            let data = {
                'body': 'note\'s body',
                'email': 'admin@mail.ru',
                'password': '0000'
            };
            it('respond with 201 created', function (done) {
                request(app)
                    .post('/api/v1/profile/notes/new')
                    .send(data)
                    .expect(200, done);
            });
        });

        describe('Create note error', function () {
            let data = {
                'email': 'admin@mail.ru',
                'password': '0000'
            };
            it('respond with 400 not created', function (done) {
                request(app)
                    .post('/api/v1/profile/notes/new')
                    .send(data)
                    .expect('400: Note Not Created', done);
            });
        });
    });
    describe('Tags', function () {
        describe('Create tag', function () {
            let data = {
                'body': 'bodyTag'
            };
            it('respond with 201 created', function (done) {
                request(app)
                    .post('/api/v1/profile/notes/1/tags/new')
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
                'name': 'newName',
                'phone': 'newPhone',
                'birth_date': 'newDate',
                'email': 'admin@mail.ru',
                'password': '0000'
            };
            it('respond with 200 updated', function (done) {
                request(app)
                    .put('/api/v1/profile/update')
                    .send(data)
                    .expect(200, done);
            });
        });
    });

    describe('Notes', function () {
        describe('Update note', function () {
            let data = {
                'body': 'newBody',
                'email': 'admin@mail.ru',
                'password': '0000'
            };
            it('respond with 200 updated', function (done) {
                request(app)
                    .put('/api/v1/profile/notes/1')
                    .send(data)
                    .expect(200, done);
            });
        });
    });

    describe('Tags', function () {
        describe('Update tag', function () {
            let data = {
                'body': 'newBody',
                'email': 'admin@mail.ru',
                'password': '0000'
            };
            it('respond with 200 updated', function (done) {
                request(app)
                    .put('/api/v1/profile/notes/1/tags/1')
                    .send(data)
                    .expect(200, done);
            });
        });
    });
});

describe('DELETE requests', function () {
    describe('Users', function () {
        describe('Delete user', function () {
            let data = {
                'email': 'test@mail.ru',
                'password': '0000'
            };
            it('respond with 200 deleted', function (done) {
                request(app)
                    .delete('/api/v1/profile/delete')
                    .send(data)
                    .expect(200, done);
            });
        });
    });

    describe('Notes', function () {
        describe('Delete note', function () {
            let data = {
                'email': 'admin@mail.ru',
                'password': '0000'
            };
            it('respond with 200 deleted', function (done) {
                request(app)
                    .delete('/api/v1/profile/notes/1')
                    .send(data)
                    .expect(200, done);
            });
        });
    });

    describe('Tags', function () {
        describe('Delete tag', function () {
            let data = {
                'email': 'admin@mail.ru',
                'password': '0000'
            };
            it('respond with 200 deleted', function (done) {
                request(app)
                    .delete('/api/v1/profile/notes/1/tags/1')
                    .send(data)
                    .expect(200, done);
            });
        });
    });
});

describe('Authentication', function () {
    it('should return login page', function (done) {
        request(app)
            .get('/login')
            .expect('Content-type', 'text/html; charset=utf-8')
            .expect(200)
            .end(function (err, res) {
                expect(res.text).to.include('Login');
                done(err);
            });
    });

    it('should redirect to "/profile"', function (done) {
        const agent = superagent.agent(app);

        agent.post('http://localhost:3000/login')
            .type('form')
            .query({'email': 'admin@mail.ru', 'password': '0000'})
            .then(res => {
                expect(res.text).to.include('Profile Page');
                done();
            })
            .catch(err => {
                throw err;
            });
    });

    it('should contain text "Oops! Wrong password." and redirect to "/login"', function (done) {
        const agent = superagent.agent(app);

        agent.post('http://localhost:3000/login')
            .type('form')
            .query({'email': 'admin@mail.ru', 'password': '1111'})
            .then(res => {
                expect(res.text).to.include('Oops! Wrong password.');
                done();
            })
            .catch(err => {
                throw err;
            });
    });

    it('should contain text "No user found." and redirect to "/login"', function (done) {
        const agent = superagent.agent(app);

        agent.post('http://localhost:3000/login')
            .type('form')
            .query({'email': 'blabla@mail.ru', 'password': '1111'})
            .then(res => {
                expect(res.text).to.include('No user found.');
                done();
            })
            .catch(err => {
                throw err;
            });
    });
});