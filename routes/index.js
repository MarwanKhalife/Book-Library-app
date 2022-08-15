const express = require('express')
const router = express.Router()
const Book = require('../models/book')

// Main index page, search and find up to 10 recent books.
router.get('/', async (req, res) => {
  let books
  try {
    books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
  } catch {
    books = []
  }
  res.render('index', { books: books })
})

module.exports = router