const express = require('express');
const {users} = require('./data/users.json')

const app = express();
const PORT = 9000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message:'Welcome to the Library Management System'
    });
});

/**
 * Route: /users
 * Method: GET
 * Description: Get all the list of users in the system
 * Access: Public
 *Parameters: None
 */
app.get('/users', (req, res) => {
  res.status(200).json({
    success: true,
    data: users
  })
});



// app.all('*', (req, res) => {
//   res.status(404).json({
//     message: 'Not Built Yet',
//     error: 'This route is not implemented yet'
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
