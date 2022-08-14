const express = require('express') // adding express module
const Author = require('../models/author')
const router = express.Router() // initializing the express router module by calling it here
const Book = require('../models/book')


// Setting up the routes for the all authors page
// Also server.js needs to be setup to look inside this routes index file to get the required response for each route the user visits in the browser
router.get('/', async (req, res) => {
    let searchOptions = {} // seach functionality
    if (req.query.name != null && req.query.name !== '') { // checking the input
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { 
            authors: authors, 
            searchOptions:  req.query })
    } catch {
        res.redirect('/')
    }
    
})

// setting up the rout for the new authers page, this page will render de form
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})

// Create Authors route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })

    try {
        const newAuthor = await author.save()
        // res.redirect(`/authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
})

module.exports = router // exporting this file so that it can be used anywhere in our app by requiring it.