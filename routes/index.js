const express = require('express') // adding express module
const router = express.Router() // initializing the express router module by calling it here


// Setting up the routes of our applications here for the root link or directory
// Also server.js needs to be setup to look inside this routes index file to get the required response for each route the user visits in the browser
router.get('/', (req, res) => {
    res.render('index')
})




module.exports = router // exporting this file so that it can be used anywhere in our app by requiring it.

