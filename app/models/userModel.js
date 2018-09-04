const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    firstName: { type: String, required: [ true, "Can't be blank"] },
    secondName: { type: String, required: [ true, "Can't be blank"] },
    email: { type: String, required: [ true, "Can't be blank" ], match: [/\S+@\S+\.\S+/, 'is invalid'], unique: true },
    password: { type: String, required: [ true, "Can't be blank"]}
},
    { timestamps: true }
);

UserSchema.plugin(validator, {message: 'The email is already taken'});

module.exports = mongoose.model('User', UserSchema);
