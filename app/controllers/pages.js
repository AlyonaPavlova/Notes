exports.home = function (req, res) {
    res.render('pages/home', {
        title: 'Home'
        , message: 'Храните ваши заметки у нас. Легко и просто!'
    });
};

exports.news = function (req, res) {
    res.send('News page');
};

exports.features = function (req, res) {
    res.send('Features page');
};

