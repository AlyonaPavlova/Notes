exports.home = function (req, res) {
    res.render('pages/home', {
        message: 'Храните ваши заметки у нас. Легко и просто!'
    });
};

exports.features = function (req, res) {
    res.render('pages/features', {
        message: 'Features.'
    });
};

exports.news = function (req, res) {
    res.render('pages/news', {
        message: 'News.'
    });
};



