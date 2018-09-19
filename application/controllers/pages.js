exports.home = function (req, res) {
    res.render('pages/home', {
        message: 'Keep your notes with us. Simply and easily!'
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

exports.newNote = function (req, res) {
    res.render('pages/newNote', {
        message: 'Form for new note'
    });
};

exports.logs = function (req, res) {
    res.render('pages/logs');
};
