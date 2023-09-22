const env = require('dotenv')
env.config('/.env')
const db = require('../entity/index.js')
const User = db.USER
console.log(User)
const bcrypt=require("bcrypt")

//Registeration

const userdetails = async (req, res) => {

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    try {
        if (req.body.username && req.body.email && req.body.password) {

            var password = req.body.password
            if (!passwordRegex.test(password)) {
                res.send("Passoword is weak")
            }
            else {
                console.log(req.body)
                const hash = await bcrypt.hash(password, 10);
                password = hash
                console.log("Success")
                const response = await User.create({
                    UserName: req.body.username,
                    Password: password,
                    EmailId: req.body.email
                });
                console.log("Success")
                res.send({ statusCode: 200, message: 'response success' })
            }
        }
        else {
            res.send("Response failed to add to DB")
        }
    } catch (error) {
        res.send({ statusCode: 400, message: 'Username or mail id already exists' })
    }
}

//login

const login = async (req, res) => {
    
    const email= req.body.email
    const password=req.body.password
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

    if (!passwordRegex.test(password)) {
        res.send("Passoword is weak")
    }
    else {
        try {
           
            const valid_user = await User.findOne({
                where: {
                    EmailId: email,
                }
            })
            console.log("DSFJKSDF")
            const valid = await bcrypt.compare(password, valid_user.Password)
            if (!valid_user.IsAdmin && valid) {
                console.log("after validation ")
                res.status(200).send({ userData: valid_user, message: "Login successful" })
            }
            else if (valid_user.IsAdmin && valid) {
                console.log("after validation ")
                res.status(200).send({ userData: valid_user, message: "Admin Login successful" })
            }
            else {
                res.status(500).send("Error fetching user")
            }

        } catch (error) {
            res.status(401).send("Invalid credentials")
        }
    }
}

module.exports = {
    userdetails,
    login
}