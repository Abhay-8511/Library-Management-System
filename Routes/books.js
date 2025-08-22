const express = require('express');
const {books} = require('../data/books.json');
const { users } = require('../data/users.json');


const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the list of books in the system
 * Access: Public
 *Parameters: None
 */

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((each)=> each.id === id);

if(!books) {
    return res.status(404).json({
      success: false,
      message: `Book not found ${id}`
    });
  }

  res.json({
    success: true,
    data: book
});
})

/**
 * Route: /books
 * Method: POST
 * Description: Added a new book
 * Access: Public
 *Parameters: None
 */
router.post('/', (req, res) => {

  const {id,title, author, genre, year_published, price,available} = req.body;
  // Check if all required fields are provided
  if(!id || !title || !author || !genre || !year_published || !price || available === undefined){
    return res.status(400).json({
      success: false,
      message: 'Please provide all the required fields'
    });
  }
  // Check if the book already exists
  const book = books.find((each) => each.id === id);
  if(book) {
    return res.status(409).json({
      success: false,
      message: `User with ID ${id} already exists`
    });
  }
  // Add the new book to the books array
books.push({id,title,author,genre,year_published,price,available});

  res.status(201).json({
    success: true,
    message: 'Book added successfully',
    data: {id,title,author,genre,year_published,price,available}
  });
})

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a book by their ID
 * Access: Public
 *Parameters: ID
 */
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const {data} = req.body; 

  if(!data ) {
    return res.status(400).json({
      success: false,
      message: 'Please provide data to update'
    })
  };
  // check if the book exists
  const booksIndex = books.findIndex((each) => each.id === id);
  if(booksIndex === -1 ) {
    return res.status(404).json({
      success: false,
      message: `Book with ID ${id} not found`
    });
  }
  // Update the book details
//    Object.assign(book, data);
  // with spread operator
  const updatedBook = books.map((each) => {
    if(each.id === id) {
      return {...each, ...data};
    }
    return each;
  });

  res.status(200).json({
    success: true,
    data: booksIndex,
    message: `Book with ID ${id} updated successfully`,
    data: updatedBook
  })
})

/**
 * Route: /books/:id
 * Method: DELETE
 * Description: Deleting a book by their ID
 * Access: Public
 *Parameters: ID
 */
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

  const booksIndex = books.findIndex((each)=> each.id === id);

if(booksIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Book not found for ${id}`
    });
  }

  books.splice(booksIndex, 1);

  res.json({
    success: true,
    data: books,
    message: `Book with ID ${id} deleted successfully`
});
})

/**
 * Route: /books/issued/for-users
 * Method: GET
 * Description: Get all the issued books for users
 * Access: Public
 *Parameters: None
 */
router.get('/issued/for-users', (req, res) => {
  const issuedBooks=[];


  users.forEach((user) => {
    if (user.issued_books && user.issued_books.length > 0) {
      user.issued_books.forEach((bookId) => {
        const book = books.find((b) => b.id === bookId);
        if (book) {
          issuedBooks.push({
            ...book,
            issuedBy: user.name,
            userId: user.id,
            issuedDate: user.issuedDate || null, 
            returnDate: user.returnDate || null  
          });
        }
      });
    }
  });

  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No issued books found'
    });
  }

  res.json({
    success: true,
    data: issuedBooks
  });
});



module.exports = router;