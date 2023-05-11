const mysql = require('mysql2');
const fs = require('fs');

// Create a connection to the MySQL server
// const connection = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   database: 'employee_tracker_db',
//   password:'',
// });

// Execute the schema.sql file
const executeSchema = () => {
  const schema = fs.readFileSync('schema.sql', 'utf8');
  connection.query(schema, (err) => {
    if (err) throw err;
    console.log('schema file run successfully.');
    executeSeeds();
  });
};

// Execute the seeds.sql file
const executeSeeds = () => {
  const seeds = fs.readFileSync('seeds.sql', 'utf8');
  connection.query(seeds, (err) => {
    if (err) throw err;
    console.log('seeds file run successfully.');
    connection.end(); // Close the MySQL connection
  });
};

// Connect to the MySQL server and execute the schema and seeds
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to server.');
  executeSchema();
});
