const express = require('express');
const db = require('../database');
const bcrypt = require('bcryptjs');
const router = express.Router();

// GET all posts
router.get('/', (req, res) => {
  // pg-promise
  db.any('SELECT * FROM posts')
    .then((posts) => {
      // if success;
      console.log(posts);

      res.render('pages/allPosts', { posts, title: 'ALL posts' });
    })
    .catch((error) => {
      // error;
      console.log(error);
      res.redirect('/error?message=' + error.message);
    });
});

// GET user form
router.get('/add', (req, res) => {
  res.render('pages/newPost', { title: 'Add Post' });
});

// // GET specific users
// router.get('/:user_id', (req, res) => {
//   const index = req.params.user_id;
//   db.oneOrNone('SELECT * FROM users WHERE id = $1', [index])
//     // const user = users[index];
//     .then((specificUser) => {
//       // fail
//       if (!specificUser) {
//         res.render('pages/error', {
//           error: 'No such user',
//           title: 'User'
//         });
//       } else {
//         // success;
//         console.log(specificUser);
//         res.render('pages/specificUser', { user: specificUser });
//       }
//     })
//     .catch((error) => {
//       // error;
//       console.log(error);
//       res.render('pages/error', {
//         error,
//         title: 'User'
//       });
//     });
// });

// POST new user
router.post('/', (req, res) => {
  const { user_id, title, content } = req.body;
  console.log(user_id, title, content)
  // Insert into DB
  db.none('INSERT INTO posts(user_id, title, content) VALUES($1, $2, $3)', [user_id, title, content])
    .then(() => {
      res.redirect('/posts');
    })
    .catch((error) => {
      // error;
      res.render('pages/error', {
        error: 'Post cannot be added',
        title: 'Post'
      });
    });
});

module.exports = router;
