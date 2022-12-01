const express = require('express'),
    pug = require('pug'),
    path = require('path'),
    routes = require('./routes/routes'),
    bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({extended: true})
const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/createuser', routes.createuser);
app.post("/submitteduser",urlencodedParser, routes.submittedUser);

app.listen(3000);