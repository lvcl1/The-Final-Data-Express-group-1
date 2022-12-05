//Put mongoose here in routes where it will be used
const mongoose = require('mongoose')
//for the password salting
const bcrypt = require("bcrypt")
let password="pass"//will change later
const salt=bcrypt.genSaltSync(10);
console.log(salt)
const hash=bcrypt.hashSync(password,salt)
const { response } = require('express');

//This statement is for mongoose 4 or earlier
mongoose.Promise = global.Promise

//Connect mongoose to the database
// const connectionString = 'mongodb://localhost/data'
const connectionString = 'mongodb+srv://root:Passroot1234@cluster0.i0jkmej.mongodb.net/test'

mongoose.connect(connectionString, {
    useUnifiedTopology: true
})

//Establish the connection with the database
const db = mongoose.connection

//Bind the connection to an errot event (called for each request)
db.on('error', console.error.bind(console, 'DB Connection Error'))

//Bind the connection to a function that will be called when db is opened(called once)
db.once('open', callback => {})

//Create a schema to define the fields, validation requirements and defaults
let questionSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: String,
    answer1: String,
    answer2: String,
    answer3: String
})

let counterSchema = mongoose.Schema({
    quesion: String,
    answerOne: String,
    answerTwo: String
})

// Create a model, Used for CRUD operations
let Data = mongoose.model("People_Collection", questionSchema)
let Counter = mongoose.model("Counter", counterSchema)

exports.index = (req, res) => {
    //query the table and find all the records
    Counter.find((err, questions) => {
        if(err) return console.error(err)

        res.render('index', {
            title: 'Data List',
            questions
        })
    })
}
exports.createuser = (req, res) => {
    res.render('createuser', {
        title: 'Create User'
    })
}
exports.submittedUser=(req,res)=>{
    let user = new Data({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        answer1: req.body.answer1,
        answer2: req.body.answer2,
        answer3: req.body.answer3
    })
    user.save((error, user) => {
        if (error) res.send(error);
        console.log(`${req.body.username} added`)
    })

    Data.find((err, users) => {
        if(err) res.send(err)

        var answerOne = 0
        var answerTwo = 0
        var answerThree = 0
        var answerFour = 0
        var answerFive = 0
        var answerSix = 0
        users.forEach(function(user){
            let useranswer1 = user.answer1
            let useranswer2 = user.answer2
            let useranswer3 = user.answer3

            if(useranswer1 == 'dogs'){
                answerOne = answerOne + 1
            }
            else if(useranswer1 == 'cats'){
                answerTwo = answerTwo + 1
            }

            if(useranswer2 == "yes"){
                answerThree = answerThree + 1
            }
            else if(useranswer2 == "no"){
                answerFour = answerFour + 1
            }

            if(useranswer3 == "sub"){
                answerFive = answerFive + 1
            }
            else if(useranswer3 == "dub"){
                answerSix = answerSix + 1
            }
        })
        Counter.findById("638d2d6ddb1c1932d476f94e", (err, user) => {
            if(err) res.send(err)
            user.answerOne = answerOne
            user.answerTwo = answerTwo
            user.save((err, user) => {
                if(err) res.send(err)
            })
        })
        Counter.findById("638d2d6ddb1c1932d476f94f", (err, user) => {
            if(err) res.send(err)
            user.answerOne = answerThree
            user.answerTwo = answerFour
            user.save((err, user) => {
                if(err) res.send(err)
            })
        })
        Counter.findById("638d2d6ddb1c1932d476f950", (err, user) => {
            if(err) res.send(err)
            user.answerOne = answerFive
            user.answerTwo = answerSix
            user.save((err, user) => {
                if(err) res.send(err)
            })
        })
    })

    res.redirect('/');
    console.log(user)
}

exports.setApi = (req, res) => {
    Counter.find((err, questions) => {
        if(err) res.send(err)
        let setData = JSON.stringify(questions)
        res.cookie('questions', setData, {maxAge: 999999999999})
        res.send(`Set the cookie data: ${setData}`)
    })
}

exports.getApi = (req, res) => {
    Counter.find((err, questions) => {
        if(err) res.send(err)
        if(req.cookies.questions != undefined){
            let getData = JSON.parse(req.cookies.questions)
            res.json(getData)
        }
        else{
            res.send('There is no cookie here')
        }
    })
}

exports.login = (req, res) => {
    Data.find((error, users) => {
        if (error) return console.error(error);

        var userinfo;
        var userset;
        var check = false;

        users.forEach(function(user) {
            let username = user.username
            let password = user.password
            console.log(user)
            if(username == req.body.userName && password == req.body.password) {
                userinfo = user

                userset = {
                    userName: userinfo.username,
                    password: userinfo.password
                    
                };
                check = true;
            } else {
                
            }
        })
        console.log(check)
        if(check == true) {
            res.render('loggedin', {
                title: 'Welcome',
                "user": userset,
                users
            })
        } else {
            res.render('index', {
                errrorLog: 'Invalid Credentials'
            })
        }
    })
}