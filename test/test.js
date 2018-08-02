const request = require('supertest');
const app = require(__dirname + '../app');

describe('GET pages', function () {
    it('should contain text "Храните ваши заметки у нас. Легко и просто!"', function (done) {
        request(app)
            .get('/')
            .expect(/Храните ваши заметки у нас. Легко и просто!/, done)
    });

    it('should contain text "Features"', function (done) {
        request(app)
            .get('/features')
            .expect(/Features/, done)
    });

    it('should contain text "News"', function (done) {
        request(app)
            .get('/news')
            .expect(/News/, done)
    });
});

describe('Correct users returned', function () {
    it('should return users', function (t) {
        request(app)
            .get('/api/v1/users')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                const expectedUsers = [];

                t.error(err, 'No error');
                t.same(res.body, expectedUsers, 'Users as expected');
                t.end();
            });
    });

    it('should return one user', function (done) {
        request(app)
            .get('/api/v1/users/:id')
            .expect('Content-type', /json/)
            .expect(200)
            .end(err => {
                if (err) return done(err);
                done();
            });
    });
});




