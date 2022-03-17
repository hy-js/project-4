// IMPORTS -------------------------------------------------------
require('dotenv').config()
// console.log(process.env)
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Import libraries + Data
const morgan = require('morgan');
const path = require('path');

// import our route files
const homeRouter = require('./routes/home.js');
const usersRouter = require('./routes/users.js');
const postsRouter = require('./routes/posts.js');
const errorRouter = require('./routes/error.js');

// MIDDLEWARE -------------------------------------------------------
// Logger
app.use(morgan('dev'));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS - views by default
app.set('view engine', 'ejs');
// app.set('/views', views);

// Static files - need path to access files directly
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES -------------------------------------------------------
app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('*', errorRouter);

// LISTEN TO EXPRESS APP ----------------------------------------------------
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
