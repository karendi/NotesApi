const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const userModel = require('../models/userModel');
const decodeToken = require('./lib').decodeToken;

exports.addUser = (req, res) => {
    let newUser;
    if(!req.body) {
        res.status(400).send({ message: "You have to provide data"});
    } 

    if(req.body.password !== undefined && req.body.password.length !== 0) {
        newUser = userModel({
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            email: req.body.email,
            password: bycrypt.hashSync(req.body.password, 8)
        })
    } else {
        res.status(500).send({message: "You need to provide the password or a longer password"});
    }

    newUser.save()
    .then((user) => {
        // create a token
        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400
        });
        res.status(201).send({user, token})
    })
    .catch((error) => res.status(500).send({error}));
}

exports.getAllUsers = (req, res) => {
    userModel.find()
    .then((users) => res.send({users}))
    .catch((error) => res.status(500).send({error}));
}

exports.getUser = (req, res) => {
    if(!req.body || req.body.password.length === 0 || req.body.email.length === 0) {
        res.status(401).send({message: "You have to provide the email and the password"});
    } 
    userModel.find({ email: req.body.email })
    .then((user) => {
        if(user === null) {
            res.status(404).send({message: "The user does not exist"});
        } else {
            // ensure that the passwords match
            const validPassword = bycrypt.compareSync(req.body.password, user[0].password);
            if(!validPassword){
                res.status(401).send({"message": "The password provided is invalid"})
            }
            const token = jwt.sign({id: user[0]._id}, config.secret, {
                expiresIn: 86400
            });
            res.status(200).send({token});
        }
    })
    .catch((error) => {
        res.status(500).send({error})
    });
}

exports.updateUser =(req, res) => {
    decodeToken(req, res);
    userModel.findByIdAndUpdate(req.params.id)
    .then()
    .catch();
}

exports.deleteuser = (req, res) => {

}