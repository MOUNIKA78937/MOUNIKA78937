const express = require('express');
const bcrypt = require('bcrypt');
const admin = require('firebase-admin');
const serviceAccount = require('./jyothisrikey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://weather-capstone-98644.firebaseio.com' // Replace with your Firebase project URL
});

const db = admin.firestore();
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); // Serve static files like HTML, CSS, and JavaScript

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Route for serving signup.html
app.get('/signup.html', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});

// Route for processing signup form
app.post('/signupSubmit', async (req, res) => {
  const { Firstname, Email, Password } = req.body;

  // Check if the email is already registered
  const usersRef = db.collection('users');
  const snapshot = await usersRef.where('Email', '==', Email).get();

  if (snapshot.empty) {
    // Email is not registered, so create a new user record with hashed password
    // Number of salt rounds for bcrypt
    const saltRounds = 10; // You can adjust the number of rounds as needed

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(Password, saltRounds);

      // Store the hashed password in the database
      await usersRef.add({
        Firstname,
        Email,
        Password: hashedPassword, // Store the hashed password
      });

      // Redirect to the index page with a success flag
      res.redirect('/index.html?signupSuccess=true');
    } catch (error) {
      console.error('Error hashing or adding document: ', error);
      res.redirect('/signup.html?signupSuccess=false');
    }
  } else {
    // Email is already registered
    res.redirect('/signup.html?signupSuccess=false');
  }
});

// Route for serving login.html
app.get('/login.html', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// Route for processing login form
app.post('/loginSubmit', async (req, res) => {
  const { Email, Password } = req.body;

  // Check if the provided email exists in the database
  const usersRef = db.collection('users');
  const snapshot = await usersRef.where('Email', '==', Email).get();

  if (!snapshot.empty) {
    // User with the provided email exists in the database
    const user = snapshot.docs[0].data();
    const hashedPassword = user.Password;

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(Password, hashedPassword);

    if (passwordMatch) {
      // Passwords match, login successful
      res.redirect('/index.html?loginSuccess=true');
    } else {
      // Passwords do not match, login failed
      res.redirect('/login.html?loginSuccess=false');
    }
  } else {
    // Email not found, login failed
    res.redirect('/login.html?loginSuccess=false');
  }
});

// Route for serving index.html
app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});