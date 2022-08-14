const express = require('express') // adding express module
const router = express.Router() // initializing the express router module by calling it here
const Book = require('../models/book')
const Author = require('../models/author')
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']


// All Books page
// Also server.js needs to be setup to look inside this routes index file to get the required response for each route the user visits in the browser
router.get('/', async (req, res) => {
    let query = Book.find()
    if(req.query.title != null && req.query.title != '') {
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    if(req.query.publishedBefore != null && req.query.publishedBefore != '') {
        query = query.lte('publishedDate', req.query.publishedBefore) // lte stands for LessThen or Equal to
    }
    if(req.query.publishedAfter != null && req.query.publishedAfter != '') {
        query = query.gte('publishedDate', req.query.publishedAfter) // gte stands for GreaterThen or Equal to
    }
    try {
        const books = await query.exec()
        res.render('books/index', {
            books: books,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// setting up the route for the new book page. new book submission form and book entry creation.
router.get('/new', async (req, res) => {
    renderNewPage(res, new Book())
})

// Create book route. form page where the book registartion happens through the form fields template page.
router.post('/', async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pagecount,
        description: req.body.description
    })
    saveCover(book, req.body.cover)

    try {
        const newBook = await book.save()
        // res.redirect(`/books/${newAuthor.id}`)
        res.redirect(`books`)
    } catch {
        renderNewPage(res, book, true)
    }
})


// New page functionality separated in this function to allow for use in multiple places without duplicate code.
async function renderNewPage(res, book, hasError = false) {
    try {
        const authors = await Author.find({})
        const params = {
            authors: authors,
            book: book
        }
        if (hasError) params.errorMessage = 'Error Creating Book';
        res.render('books/new', params)
    } catch {
        res.redirect('/books')
    }
}

// Function to capture the user uploaded image into a buffer base64 encoded string to store in our DB
function saveCover(book, coverEncoded) {
    if(coverEncoded == null || coverEncoded.length < 1) return
    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        book.coverImage = new Buffer.from(cover.data, 'base64')
        book.coverImageType = cover.type
    }
}

module.exports = router // exporting this file so that it can be used anywhere in our app by requiring it.