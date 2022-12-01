//for the password salting
const bcrypt = require("bcrypt")
let password="pass"//will change later
const salt=bcrypt.genSaltSync(10);
console.log(salt)
const hash=bcrypt.hashSync(password,salt)
const { response } = require('express');

exports.index = (req, res) => {
    res.render('index', {
        title: 'Login Page'
    })
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