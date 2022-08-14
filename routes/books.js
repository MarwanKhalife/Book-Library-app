const express = require('express') // adding express module
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const Book = require('../models/book')
const Author = require('../models/author')
const uploadPath = path.join('public', Book.coverImageBasePath)
const router = express.Router() // initializing the express router module by calling it here
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})


// Books page
// Also server.js needs to be setup to look inside this routes index file to get the required response for each route the user visits in the browser
router.get('/', async (req, res) => {
    res.send('All Books')
})

// setting up the route for the new book page. new book submission form and book entry creation.
router.get('/new', async (req, res) => {
    renderNewPage(res, new Book())
})

// Create book route. form page where the book registartion happens through the form fields template page.
router.post('/', upload.single('cover'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pagecount,
        coverImageName: fileName,
        description: req.body.description
    })

    try {
        const newBook = await book.save()
        // res.redirect(`/books/${newAuthor.id}`)
        res.redirect(`books`)
    } catch {
        if (book.coverImageName != null) {
            removeBookCover(book.coverImageName)
        }
        renderNewPage(res, book, true)
    }
})

function removeBookCover(fileName) {
    fs.unlink(path.join(uploadPath, fileName), err => {
        if (err) console.error(err)
    })
}


// New page functionality separated in this function to allow for use in multiple places without duplicate code.
async function renderNewPage(res, book, hasError = false) {
    try {
        const authors = await Author.find({})
        const params = {
            authors: authors,
            book: book
        }
        if (hasError) params.errorMessage = 'Error Creating Book'
        res.render('books/new', params)
    } catch {
        res.redirect('/books')
    }
}

module.exports = router // exporting this file so that it can be used anywhere in our app by requiring it.