module.exports = (app) => {
    const noteController = require('../controllers/notesController');

    // Create a note
    app.post('/notes', noteController.create);

    // Retrieve all notes
    app.get('/notes', noteController.findAll);

    //Retrieve a single note 
    app.get('/notes/:noteId', noteController.findOne);

    //Update a note with noteId
    app.put('/notes/:noteId', noteController.update);

    //Delete a note with noteId
    app.delete('/notes/:noteId', noteController.delete);
}
