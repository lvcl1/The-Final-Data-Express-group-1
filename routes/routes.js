//for the password salting
const bcrypt = require("bcrypt")
let password="pass"//will change later
const salt=bcrypt.genSaltSync(10);
//console.log(salt)
const hash=bcrypt.hashSync(password,salt)
const { response } = require('express');

exports.index = (req, res) => {
    res.render('index', {
        title: 'Login Page'
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