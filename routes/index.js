// Router is a method that comes with the express package
const router = require('express').Router();

// Importing modular routers for /index and /notes
const notesRouter = require('./notes');

//localhost:3001/api/notes
router.use('/notes', notesRouter);

module.exports = router;