const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const userModel = require('../models/userModel');

exports.decodeToken = (req, res, func) => {
    const token = req.headers['x-access-token'];
    if(!token) {
        return res.status(403).send({
            message: "You have to provide a token" }); 
    }
    jwt.verify(token, config.secret, (error, decoded) => {
        if(error) {
            res.status(401).send({ message: "You are not authorized" });
        }
        userModel.findById(decoded.id)
        .then((user) => {
            () => func();
        })
        .catch(error => {
            res.status(500).send({error});
        });
    });
}

exports.handleObjectNotFound = (error, res) => {
    if(error.kind === "ObjectId") {
        res.status(400).send({message: "The object with that ID does not exist"})
    }
    res.status(500).send({error});
}
