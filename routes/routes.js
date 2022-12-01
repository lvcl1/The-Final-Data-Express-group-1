const { response } = require('express');

exports.index = (req, res) => {
    res.render('index', {
        title: 'Login Page'
    })
}