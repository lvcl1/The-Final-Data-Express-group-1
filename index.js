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
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('your passphrase here'))

let questionData = [
    {Question1: 'Do you prefer dogs or cats?', answer1: 0},
    {Question2: 'Pineapple on pizza?', answer2: 0},
    {Question3: 'Sub or dub for anime?' , answer3: 0}
]

app.get('/', routes.index);
app.get('/createuser', routes.createuser);
app.post("/submitteduser",urlencodedParser, routes.submittedUser);

app.get('/setApi' , (req, res) => {
    let setData = JSON.stringify(questionData)
    res.cookie('questionData', setData, {maxAge: 999999999999})
    res.send(`Set the cookie data: ${setData}`)
})

app.get('/getApi', (req, res) => {
    if(req.cookies.questionData != undefined){
        let getData = JSON.parse(req.cookies.questionData)
        res.json(getData)
    }
    else{
        res.send('There is no cookie here')
    }
})

app.listen(3000);