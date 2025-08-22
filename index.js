const express = require('express');
const app = express();
// const {users} = require('./data/users.json')
// Importing routers for users and books
const userRouter = require('./Routes/user');
const bookRouter = require('./Routes/books');
const PORT = 8081;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message:'Welcome to the Library Management System'
    });
});

app.use('/users', userRouter);
app.use('/books', bookRouter);
/**
 * Route: /users
 * Method: GET
 * Description: Get all the list of users in the system
 * Access: Public
 *Parameters: None
 */
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: users
  })
});

/**
 * Route: /users/:id
 * Method: GET
 * Description: Select a user by their ID
 * Access: Public
 *Parameters: None
 */
app.get('/:id', (req, res) => {
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
app.post('/', (req, res) => {

  const {id,name, email, age, membership, borrowed_books} = req.body;
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
    borrowed_books
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
app.put('/:id', (req, res) => {
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
app.delete('/:id', (req, res) => {
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

// app.all('*', (req, res) => {
//   res.status(404).json({
//     message: 'Not Built Yet',
//     error: 'This route is not implemented yet'
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
