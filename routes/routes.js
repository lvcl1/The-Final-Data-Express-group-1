//Put mongoose here in routes where it will be used
const mongoose = require('mongoose')
//for the password salting
const bcrypt = require("bcrypt")
let password="pass"//will change later
const salt=bcrypt.genSaltSync(10);
//console.log(salt)
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
    usename: String,
    password: String,
    email: String,
    age: String,
    answer1: String,
    answer2: String,
    answer3: String
})

// Create a model, Used for CRUD operations
let Data = mongoose.model("People_Collection", questionSchema)

exports.index = (req, res) => {
    //query the table and find all the records
    Data.find((err, data) => {
        if(err) return console.error(err)

        res.render('index', {
            title: 'Data List',
            data
        })
    })
}
exports.createuser = (req, res) => {
    res.render('createuser', {
        title: 'Create User'
    })
}
exports.submittedUser=(req,res)=>{
    let user={
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
        age:req.body.age,
        answer1:req.body.answer1,
        answer2:req.body.answer2,
        answer3:req.body.answer3
    }
    // let userRecord=`
    // name: ${user.name}
    // password: ${user.password}
    // email: ${user.email}
    // age: ${user.age}
    // answer1: ${user.answer1}
    // answer2: ${user.answer2}
    // answer3: ${user.answer3}
    // `;
    // fs.appendFile("names.txt",personRecord,err=>{
    //     if (err) throw err;
    //     else console.log("saved");
    // });
    console.log(user)
    // res.render("submitted",{
    //     'title':"submitted",
    //     "config":config,
    //     "person":user
    // })
}

exports.login = (req, res) => {
    let user = {
        userName: req.body.userName,
        password: req.body.password
        
    };
    res.render('loggedin', {
        title: 'Welcome',
        "user": user
    })
}