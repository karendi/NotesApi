const notesModel = require('../models/noteModel');
const lib = require('./lib');

// create a new note
exports.create = (req, res) => {
    const createNote = (req, res) => {
        // validate the data
        if(!req.body) {
            return res.status(400).send({
                message: "You have to provide data"
            });
        }
        
        // create the note
        const note = new notesModel({
            title: req.body.title,
            note: req.body.note
        });
    
        // save the note
        note.save()
        .then((data)=> res.status(201).send({data}))
        .catch((err)=> res.status(500).send({message: err.message}));

    }

    lib.decodeToken(req, res, createNote(req, res))
}

// retrieve all notes
exports.findAll = (req, res) => {
    const getAllNotes = (req, res) => {
        notesModel.find()
        .then(notes => res.status(200).send(notes))
        .catch(error => res.status(500).send({message: error.message}));
    }

    lib.decodeToken(req, res, getAllNotes(req, res));
}

// retrieve a single note
exports.findOne = (req, res) => {
    const getOneNote = (req, res) => {
        notesModel.findById(req.params.noteId)
        .then((note) => {
            res.status(200).send({note})
        })
        .catch((error) => {
            lib.handleObjectNotFound(error, res);
        });
    }

    lib.decodeToken(req, res, getOneNote(req, res));
  
}

// update a note
exports.update = (req, res) => {
    const updateNote = (req, res) => {
        if(!req.body) {
            res.status(400).send({message: "You have to provide data"});
        }
        notesModel.findByIdAndUpdate(req.params.noteId, {
            title: req.body.title || 'Untitled note',
            note: req.body.note
        }, { new: true })
        .then(note => res.status(200).send({note}))
        .catch( (error)=> {
            lib.handleObjectNotFound(error, res);
        });
    }

    lib.decodeToken(req, res, updateNote(req, res))
}

//delete a note
exports.delete = (req, res) => {
    const deleteNote = (req, res) => {
        notesModel.findByIdAndRemove(req.params.noteId)
        .then(note => res.send({message: "Note delted successfully"}))
        .catch( (error)=> {
            lib.handleObjectNotFound(error, res);
        });
    }

    lib.decodeToken(req, res, deleteNote(req, res));
}
