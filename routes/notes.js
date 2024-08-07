const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

// GET Route for retrieving all the feedback
notes.get('/', (req, res) =>
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))
);
  
// POST Route for submitting feedback
notes.post('/', (req, res) => {
// Destructuring assignment for the items in req.body
    const { title, text } = req.body;

// If all the required properties are present
    if (title && text) {
// Variable for the object we will save
        const newNote = {
        title,
        text,
        id: uuidv4(),
        };

        readAndAppend(newNote, './db/notes.json');

        const response = {
        status: 'success',
        body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting note');
    }
});

// DELETE Route for a specific note
//localhost:3001/api/notes/notes/:id
notes.delete('/notes/:id', (req, res) => {
    const notesId = req.params.id;
    console.log(notesId);
    readFromFile('./db/notes.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
// Make a new array of all notes except the one with the ID provided in the URL
    const result = json.filter((notes) => notes.id !== notesId);
// Save that array to the filesystem
    writeToFile('./db/notes.json', result);
// Respond to the DELETE request
        res.json(`Item ${notesId} has been deleted 🗑️`);
    });
});
  
module.exports = notes;
