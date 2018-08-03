const app = require(__dirname + './app');
const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('App listening on port 3000!');
});