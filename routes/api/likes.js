const express = require('express');
const router = express.Router();

// Load Model
const Like = require('../../models/Like');


// @route   POST api/like/:id
// @desc    LIKE post
// @access  
router.post('/:id', (req, res) => {
  const { userEmail, businessID } = req.body;
  Like.findOne({ businessID })
    .then(item => {
      if (item) {
        item.likes.unshift({
          userEmail
        })
        item
          .save()
          .then(item => res.json(item))
          .catch(err => console.log(err));
      } else {
        const newLike = new Like({
          businessID
        });
        newLike.likes.unshift({
          userEmail
        });
        newLike
          .save()
          .then(item => res.json(item))
          .catch(err => console.log(err));
      }
    })
})


module.exports = router;