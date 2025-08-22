const express = require('express');
const {users} = require('../data/users.json');
const {books} = require('../data/books.json');
const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all the list of users in the system
 * Access: Public
 *Parameters: None
 */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: users
  })
});

/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: Get the subscription details for a user by their ID
 * Access: Public
 *Parameters: ID
 */
router.get('/subscription-details/:id', (req, res) => {
  const id = parseInt(req.params.id,10);
  // const {id} = req.params;
  // Find the user by ID
  const user = users.find((every) => every.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${id} not found`
    });
  }
  // Extract the subscription details
  const getDateInDays = (dateString = '') => {
    const date = dateString ? new Date(dateString) : new Date();
    return Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
  };

    const subscriptionType = (date) => {
      if(user.membership === 'silver') {
        date = date + 90;
    }else if(user.membership === 'gold') {
        date = date + 180;
      }else if(user.membership === 'platinum') {
        date = date + 365;
      }
      return date;
    }
  // subscription Expiration Calculation
// January 1 , 1970 UTC //milliseconds

let returnDate = getDateInDays(user.returnDate);
let currentDate = getDateInDays();
let subscriptionDate = getDateInDays(user.subscriptionDate);
let subscriptionExpiration = subscriptionType(subscriptionDate); 


const data = {
  ...user,
  subscriptionExpired: subscriptionExpiration < currentDate,
  subscriptionDaysLeft: subscriptionExpiration - currentDate,
  daysLeftForExpiration: returnDate-currentDate,
  returnDate: returnDate < currentDate? "Book is overdue" :returnDate,
  fine: returnDate < currentDate? subscriptionExpiration <=currentDate ?200 :100:0

}
  res.status(200).json({
    success: true,
    data
  });
});

/**
 * Route: /users/:id
 * Method: GET
 * Description: Select a user by their ID
 * Access: Public
 *Parameters: None
 */
router.get('/:id', (req, res) => {
  // console.log("params 👉", req.params);
  const id = parseInt(req.params.id);
  const user = users.find((each)=> each.id === id);

if(!user) {
    return res.status(404).json({
      success: false,
      message: `User not found ${id}`
    });
  }

  res.json({
    success: true,
    data: user
});
})

/**
 * Route: /users
 * Method: POST
 * Description: Create/Register a new user
 * Access: Public
 *Parameters: None
 */
router.post('/', (req, res) => {

  const {id,name, email, age, membership, issued_books} = req.body;
  // Check if all required fields are provided
  if(!id || !name || !email || !age || !membership || !borrowed_books) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all the required fields'
    });
  }
  // Check if the user already exists
  const user = users.find((each) => each.id === id);
  if(user) {
    return res.status(409).json({
      success: false,
      message: `User with ID ${id} already exists`
    });
  }
  // If all checks pass, create the user
  // and push it to the users array
users.push({
    id,
    name,
    email,
    age,
    membership,
    issued_books,
    issuedDate: issuedDate || null,
    returnDateDate: returnDate || null,
  });

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: users
  });
})

/**
 * Route: /users/:id
 * Method: GET
 * Description: Updating a user by their ID
 * Access: Public
 *Parameters: ID
 */
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const {data} = req.body; 
  // check if the user exists
  const user = users.find((each) => each.id === id);
  if(!user) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${id} not found`
    });
  }
  // Object.assign(user, data);
  // with spread operator
  const updatedUser = users.map((each) => {
    if(each.id === id) {
      return {...each, ...data};
    }
    return each;
  });

  res.status(200).json({
    success: true,
    data: updatedUser,
    message: `User with ID ${id} updated successfully`,

  })
})

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Deleting a user by their ID
 * Access: Public
 *Parameters: ID
 */
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

  const userIndex = users.findIndex((each)=> each.id === id);

if(userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `User not found for ${id}`
    });
  }

  users.splice(userIndex, 1);

  res.json({
    success: true,
    data: users,
    message: `User with ID ${id} deleted successfully`
});
})
module.exports = router;