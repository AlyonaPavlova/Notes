const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authenticationMiddleware = require('../authenticate/middleware');

const Users = require('../controllers/usersController');

passport.authenticate('local', { failureFlash: 'Invalid username or password.' });
passport.authenticate('local', { successFlash: 'Welcome!' });

const user = async function () {
    await Users.findUser();
};

passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true
}, (password, err, done) => {
        if (err) {
            return done(err)
        }
        if (!user) {
            return done(null, false, {message: 'Incorrect email.'})
        }
        if (password !== user.password ) {
            return done(null, false, {message: 'Incorrect password.'})
        }
        return done(null, user)
    }
));


function findUser (email, callback) {
    if (email === user.email) {
        return callback(null, user)
    }
    return callback(null)
}


passport.serializeUser(function (user, cb) {
    cb(null, user.email)
});

passport.deserializeUser(function (email, cb) {
    findUser(email, cb)
});

function initPassport () {
    passport.use(new LocalStrategy(
        (username, password, done) => {
            findUser(username, (err, user) => {
                if (err) {
                    return done(err)
                }

                // User not found
                if (!user) {
                    console.log('User not found');
                    return done(null, false)
                }
                if (password !== user.password ) {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))
                }
                return done(null, user)
                })
            }));

    passport.authenticationMiddleware = authenticationMiddleware
}


module.exports = initPassport;

// passport.use(new LocalStrategy({
//         passReqToCallback: true
//     }, (req, password, err, done) => {
//         if (err) {
//             return done(err)
//         }
//         if (!user) {
//             return done(null, false, req.flash('loginMessage', 'No user found.'))
//         }
//         if (password !== user.password ) {
//             return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))
//         }
//         return done(null, user)
//     }
// ));
