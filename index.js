const express = require('express'),
    pug = require('pug'),
    path = require('path'),
    routes = require('./routes/routes'),
    bodyParser = require('body-parser');
    const cookieParser = require('cookie-parser')

const urlencodedParser = bodyParser.urlencoded({extended: true})
const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'pubic')));
app.use(cookieParser('your passphrase here'))



app.get('/', routes.index);
app.get('/createuser', routes.createuser);
app.post("/submitteduser", urlencodedParser, routes.submittedUser);
app.get('/setApi', routes.setApi)
app.get('/api', routes.getApi)


app.post('/loggedin', urlencodedParser, routes.login);

app.listen(3000);