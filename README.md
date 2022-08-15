# Book library Web-App using Node, Express, EJS, Mongo Atlas, FilePond.

App live on Heroku: https://booklibrary-webapp.herokuapp.com

## General app functionality:
- Add Authors to which multiple books can be assigned
- Edit Authors names and delete Authors
- Add Books with name, date, number of pages and link to an Author. Add a description as well.
- Edit the book information
- Add a book cover image
- Link to Author from Book page and link to books from the Author page
- Main page shows the recently added books with the newest first
- Main Page limits the book list to 10


## Tech
- All of the data is being stored on MongoDB Atlas
- Using MVC for the filestructure 
- Utilizing Partial views files to reduce duplicate code where possible
- Using FilePond for a beautiful image selection and upload flow + preview + image auto resize.
- Converting image to BASE64 in buffer to avoid having to store the original file before conversion.


## Possible improvements
This project was focused more on the back-end logic and mechanics, the Front-End is very basic and not responsive at the moment.
- Improve Front-End design and Menu bar section
- Make responsive and mobile friendly