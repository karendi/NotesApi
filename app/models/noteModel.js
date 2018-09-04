const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let noteSchema = new Schema({
    title: { type: String, required: true },
    note:  { type: String, required: true },
    }, 
    { timestamps : true }
);

module.exports = mongoose.model('Note', noteSchema);
