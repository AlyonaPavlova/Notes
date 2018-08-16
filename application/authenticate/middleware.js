function authenticationMiddleware (req, res, next) {
    if (req.isAuthenticated()) {
        console.log('AUTH SUCCESS');
        return next();
    }
    console.log('AUTH ERROR');
    res.redirect('/');
}

module.exports = authenticationMiddleware;