const expect = require('chai');
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
            .get('/api/v1/user/users')
            .expect('Content-type', /json/)
            .expect(200, done());

    });

    it('should return a single user with id = 1', function (done) {
        request(app)
            .get('/api/v1/user/1')
            .expect('Content-type', /json/)
            .expect(200, done());
    });

    it('should be an object with keys and values', function (done) {
        request(app)
            .get('/api/v1/user/1')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.have.property("email");
                expect(res.body.email).to.not.equal(null);
                expect(res.body).to.have.property("password");
                expect(res.body.password).to.not.equal(null);
                expect(res.body.password).to.include("@");
                expect(res.body).to.have.property("name");
                expect(res.body.name).to.not.equal(null);
            })
    });
});

describe('Non-existing user', function () {
    it('should return user not found', function (done) {
        request(app)
            .get('/users/idisnonexisting')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect('"User not found"')
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('Create user', function () {
    let data = {
        "id": "1",
        "email": "admin@gmail.com",
        "password": "0000",
        "name": "Admin",
        "phone": "",
        "notes_count": "0",
        "birth_date": ""
    };
    it('respond with 201 created', function (done) {
        request(app)
            .post('/api/v1/registration')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('Create user error', function () {
    let data = {
        "email": "admin@gmail.com",
        "password": "0000",
        "name": "Admin",
        "phone": "",
        "notes_count": "0",
        "birth_date": ""
    };
    it('respond with 400 not created', function (done) {
        request(app)
            .post('/api/v1/registration')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect('"User not created"')
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});




