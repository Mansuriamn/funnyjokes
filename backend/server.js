import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql';
import Path from 'path';

dotenv.config();  // Loads environment variables from the .env file

const app = express();
const _dirname = Path.resolve();

app.use(cors());  // Enable CORS
// app.use(express.static(Path.join(_dirname, "/frontend/dist")));  // Serve static files from React frontend

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: process.env.DB_HOST,      // Database host, usually 'localhost'
  user: process.env.DB_USER,      // MySQL username
  password: process.env.DB_PASS,  // MySQL password
  database: process.env.DB_NAME   // Name of the database
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Route to fetch jokes from the database
app.get('/api/jokes', (req, res) => {
  const query = 'SELECT * FROM jokes';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching jokes:', err);
      return res.status(500).send('Error fetching jokes');
    }
    res.json(results);  // Send the fetched jokes as the response
  });
});

// Catch-all route to serve the React frontend for all other routes
// app.get('*', (req, res) => {
//   res.sendFile(Path.resolve(_dirname, "frontend", "dist", "index.html"));
// });

const port = process.env.PORT || 4000;  // Use PORT from environment variables, or fallback to 4000

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);  // Log the server URL
});
