const express = require('express');

const app = express();
const port = 8080; // You can change the port number as needed

app.get('/', (req, res) => {
  res.send(`
      <h1>Content from another site</h1>
      <a href="http://localhost:3000/cookie-svg" target="_blank" rel="noopener noreferrer">link to another site</a>
      <div style="margin-top:3rem;">
        <img style="width:5rem;"src="http://localhost:3000/cookie-svg" alt="Cookie SVG - if you see this, you don't have a cookie">
      </div>
  `);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});