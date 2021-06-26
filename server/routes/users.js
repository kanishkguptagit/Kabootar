const router = require('express').Router();
const uuid = require('uuid');
// const bcrypt = require('bcrypt');
const User = require('../models/user.models');
// var ObjectID = require('mongodb').ObjectID;

router.route('/').get((req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err =>res.status(400).json('Error: ' + err));
})

//uid?
router.route('/add').post((req,res) => {
    const username = req.body.username; 
    // const password = bcrypt.hash(req.body.password, 10);
    const password = req.body.password;
    const newUser = new User({id:uuid.v4(), username:username, password:password}); //..username is changed to Username here too. Shouldn't create an error as it is just a variable name. unless: the variable name has to match somewhre else.

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
