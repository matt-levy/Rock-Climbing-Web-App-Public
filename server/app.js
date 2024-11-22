const express = require("express");
const app = express();

require('dotenv').config();

const session = require('express-session');
const store = new session.MemoryStore();

app.use(session({
  secret: 'swag money',
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: 'auto',  // or true if you are using HTTPS
      httpOnly: true,
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  },
  store
}));


// Log session activity
app.use((req, res, next) => {
  console.log("Session ID:", req.sessionID);
  console.log("Session data:", req.session);
  console.log("Session User:", req.session.user);
  console.log("Store:", store);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRoute = require('./route/userRoute');
app.use('/api/user', userRoute);

const postRoute = require('./route/postRoute');
app.use('/api/post', postRoute);

const loginRoute = require('./route/loginRoute');
app.use('/api/login', loginRoute);

app.get("/", function (req, res) {
  res.sendFile("login.html", { root: "./client/views" });
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
      if (err) {
          console.error('Failed to destroy session:', err);
          return res.status(500).send('Failed to log out');
      }
      res.redirect('/login');
  });
});

app.get("/signup", function (req, res) {
  res.sendFile("signup.html", { root: "./client/views" });
});

app.get("/home", function (req, res) {
  res.sendFile("index.html", { root: "./client/views" });
});

app.use(express.static('client/public'));

app.listen(1337, () => console.log("Marist Chatter listening on port 1337!"));
