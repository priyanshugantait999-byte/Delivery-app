const mysql = require('mysql2');

// Connect WITHOUT specifying the database first so we can create it
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password' /* REPLACE THIS with your MySQL password */
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err);
    return;
  }
  console.log('✅ Connected to MySQL server!');

  // 1. Create the database if it doesn't already exist
  db.query('CREATE DATABASE IF NOT EXISTS grocery_db', (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('✅ Database "grocery_db" is ready!');

    // 2. Tell MySQL to use this database for all future queries
    db.query('USE grocery_db', (err) => {
      if (err) throw err;

      // 3. Create the products table if it doesn't already exist
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            price DECIMAL(10, 2) NOT NULL
        )
      `;
      
      db.query(createTableQuery, (err) => {
        if (err) {
          console.error('Error creating table:', err);
          return;
        }
        console.log('✅ Table "products" is ready!');

        // 4. Check if the table is empty. If it is, add some starter items!
        db.query('SELECT COUNT(*) AS count FROM products', (err, results) => {
          if (err) throw err;
          
          if (results[0].count === 0) {
            const insertDataQuery = `
              INSERT INTO products (name, price) VALUES 
              ('Fresh Apples (1kg)', 2.99),
              ('Organic Milk (1L)', 1.49),
              ('Whole Wheat Bread', 2.00),
              ('Farm Eggs (1 Dozen)', 3.50)
            `;
            
            db.query(insertDataQuery, (err) => {
              if (err) throw err;
              console.log('✅ Starter groceries added to the database!');
            });
          } else {
            console.log('✅ Groceries already exist in the database. Ready to go!');
          }
        });
      });
    });
  });
});

module.exports = db;