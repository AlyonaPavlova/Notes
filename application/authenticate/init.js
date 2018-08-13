const LocalStrategy = require('passport-local').Strategy;
const authenticationMiddleware = require('../authenticate/middleware');

const Users = require('../controllers/usersController');

async function findUser (email, callback) {
    try {
        const user = await Users.findUser(email);
        return callback(null, user);
    } catch (err) {
        return err;
    }
}
module.exports = async function (passport) {
    passport.authenticate('local', {failureFlash: 'Invalid username or password.'});
    passport.authenticate('local', {successFlash: 'Welcome!'});

    passport.serializeUser(async function (user, done) {
        done(null, user.email);
    });

    passport.deserializeUser(async function (email, cb) {
        await findUser(email, cb);
    });

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    async function (req, email, password, done) {
        await findUser(email, (err, user) => {
            if (err) {
                return done(err);
            }
            if (user === undefined) {
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            }
            if (password !== user.password) {
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            }
            return done(null, user);
        });
    }));

    passport.authenticationMiddleware = authenticationMiddleware;
};
