const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000; // You can change the port number as needed

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Route for UI with login screen and cookie details
app.get('/', (req, res) => {
  // If there is a username cookie set, display its details
  let cookieDetails = '';
  if (req.cookies?.username) {
      cookieDetails = `
          <h2>Cookie Details:</h2>
          <p>Username: ${req.cookies.username}</p>
          <form action="/logout" method="post">
              <input type="submit" value="Logout">
          </form>
      `;
  }

  // Display login form and cookie details
  res.send(`
      <h1>Login</h1>
      <form action="/login" method="post">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username"><br><br>
          <label for="samesite">Select SameSite attribute for the cookie:</label>
          <select id="samesite" name="samesite">
              <option value="Lax">Lax</option>
              <option value="Strict">Strict</option>
              <option value="None">None</option>
          </select><br><br>
          <input type="submit" value="Login">

          <div style="margin-top:3rem;">
            <img style="width:5rem;"src="/cookie-svg" alt="Cookie SVG - if you see this, you don't have a cookie">
          </div>
      </form>
      ${cookieDetails}
  `);
});

// Route for login
app.post('/login', (req, res) => {
  const { username, samesite } = req.body;
  if (username) {
      // Set a cookie with the username and specified SameSite attribute
      res.cookie('username', username, { 
          sameSite: samesite,
          httpOnly: true // Prevents client-side JavaScript from accessing the cookie
      });
      res.redirect('/');
  } else {
      res.status(400).send('Invalid username');
  }
});


// Route for logout
app.post('/logout', (req, res) => {
  // Clear the username cookie
  res.clearCookie('username');
  res.redirect('/');
});

// Route for SVG only if cookie is set
app.get('/cookie-svg', (req, res) => {
  // Check if username cookie is set
  if (req.cookies.username) {
      // Return SVG content
      const svgContent = `
<svg fill="#000000" width="800px" height="800px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
  <path d="M223.45117,118.0293a11.95148,11.95148,0,0,0-10.09521-2.31348,27.993,27.993,0,0,1-34.15381-27,11.97247,11.97247,0,0,0-11.91748-11.918,27.99308,27.99308,0,0,1-27.00049-34.1543,12.01319,12.01319,0,0,0-11.68359-14.63769c-.2085-.001-.41309-.00195-.62207-.00195a99.99974,99.99974,0,1,0,100.01611,99.38281A11.99348,11.99348,0,0,0,223.45117,118.0293Zm-30.45605,75.083c-35.37354,35.3125-93.29492,35.69922-129.11475.86329a91.99664,91.99664,0,0,1,64.1001-157.97168c.19043,0,.38183.001.57275.002a4.04183,4.04183,0,0,1,3.15772,1.52637,3.92615,3.92615,0,0,1,.76758,3.35742,35.99441,35.99441,0,0,0,34.71923,43.9082,4.0235,4.0235,0,0,1,4.00489,4.00391,35.99387,35.99387,0,0,0,43.90625,34.71972,3.94377,3.94377,0,0,1,3.36279.76954,4.02736,4.02736,0,0,1,1.523,3.14453A91.33176,91.33176,0,0,1,192.99512,193.1123Zm-31.33838-26.769a7.99984,7.99984,0,1,1-11.31348,0A7.99959,7.99959,0,0,1,161.65674,166.34326Zm-64-8a7.99984,7.99984,0,1,1-11.31348,0A7.99959,7.99959,0,0,1,97.65674,158.34326Zm-8-44.68652a7.99984,7.99984,0,1,1,0-11.31348A7.99915,7.99915,0,0,1,89.65674,113.65674Zm52,4.68652a7.99984,7.99984,0,1,1-11.31348,0A7.99959,7.99959,0,0,1,141.65674,118.34326Z"/>
</svg>
      `;
      res.set('Content-Type', 'image/svg+xml');
      res.send(svgContent);
  } else {
      res.status(403).send('Forbidden: Cookie not set');
  }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});