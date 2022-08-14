const express = require('express') // adding express module
const router = express.Router() // initializing the express router module by calling it here
const Book = require('../models/book')


// Setting up the routes of our applications here for the root link or directory
// Also server.js needs to be setup to look inside this routes index file to get the required response for each route the user visits in the browser
router.get('/', async (req, res) => {
    let books
    try {
        books = await Book.find().sort({ createdAt: 'desc'}).limit(10).exec()
    } catch (error) {
        books = []
    }
    res.render('index', { books: books })
})




module.exports = router // exporting this file so that it can be used anywhere in our app by requiring it.

