const express = require('express');

const app = express();
const PORT = 8000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message:'Welcome to the Library Management System'
    });
});

app.all('*', (req, res) => {
  res.status(404).json({
    message: 'Not Built Yet',
    error: 'This route is not implemented yet'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
