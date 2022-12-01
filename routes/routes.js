//for the password salting
const bcrypt = require("bcryptjs")
let password="pass"//will change later
const salt=bcrypt.genSaltSync(10);
console.log(salt)
const hash=bcrypt.hashSync(password,salt)