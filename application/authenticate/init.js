const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authenticationMiddleware = require('../authenticate/middleware');

const Users = require('../controllers/usersController');



// const user = async function () {
//     await Users.findUser();
// };

const user = {
    email: "admin@mail.ru",
    password: "0000",
    id: 1
};

function findUser(email, callback) {
    console.log("find");

    if (email === user.email) {
        return callback(null, user)
    }
    return callback(null);
}

module.exports = function (passport) {
    passport.authenticate('local', {failureFlash: 'Invalid username or password.'});
    passport.authenticate('local', {successFlash: 'Welcome!'});

    passport.serializeUser(function (user, done) {
        done(null, user.email)
    });

    passport.deserializeUser(function (email, cb) {
        findUser(email, cb)
    });

    passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
        (req, email, password, done) => {
            findUser({ 'local.email' :  email }, (err, user) => {
                if (err) {
                    return done(err)
                }

                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }
                if (password !== user.password) {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))
                }
                return done(null, user)
            })
        }));

    passport.authenticationMiddleware = authenticationMiddleware;
};
