const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index') // linking the routes index file to the server js file in order for it to be used to generate the responses.
require('dotenv').config()


app.set('view engine', 'ejs') // setup the render engine we wish to use
app.set('views', __dirname + '/views') //direct our server to the views directory
app.set('layout', 'layouts/layout') // creating standard html layouts to be used for our pages when rendered by ejs. here we are pointint the server towards the layouts folder.
app.use(expressLayouts) // tell the app to use the express layouts module
app.use(express.static('public')) // setting up the public documents folder (public views).

const mongoose = require('mongoose')
mongoose.connect (process.env.MONGODB_URI, {
    useNewUrlParser: true,
    UseUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to MongoDB Mongoose'))


app.use('/', indexRouter) // using the indexrouter as our route to our root directory



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
})