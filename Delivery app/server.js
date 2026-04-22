const express = require('express');
const db = require('./db');
const app = express();
const PORT = 3000;

// Serve all files from the 'public' folder
app.use(express.static('public')); 
app.use(express.json());

// API route to get products from MySQL
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});