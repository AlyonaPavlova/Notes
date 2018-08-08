exports.home = function (req, res) {
    res.render('pages/home', {
        message: 'Храните ваши заметки у нас. Легко и просто!'
    });
};

exports.features = function (req, res) {
    res.render('pages/features', {
        message: 'Features'
    });
};

exports.news = function (req, res) {
    res.render('pages/news', {
        message: 'News'
    });
};

exports.registration = function (req, res) {
    res.render('pages/registration', {
        message: 'Registration'
    });
};

exports.login = function (req, res) {
    res.render('pages/login', {
        message: 'Login'
    });
};

exports.newNote = function (req, res) {
    res.render('pages/newNote', {
        message: 'Form for new note'
    });
};

exports.newTag = function (req, res) {
    res.render('pages/newTag', {
        message: 'Form for new tag'
    });
};