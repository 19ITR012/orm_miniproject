var express = require('express');
var router = express.Router();
var User=require("../models/controllers/users")
var Skill=require("../models/controllers/skill")

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//user
router.post('/Register',User.userdetails)
router.post('/login',User.login)

//skill
router.post('/Skill',Skill.create_skill)
router.get('/admin/data/',Skill.fetch_skill)

module.exports = router;
