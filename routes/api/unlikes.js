const express = require('express');
const router = express.Router();

// Load Model
const Like = require('../../models/Like');


// @route   POST api/unlkie/:id
// @desc    UnLike post
// @access  
router.post('/', (req, res) => {
  const { userEmail, businessID } = req.body;
  Like.findOne({ businessID })
    .then(item => {
      if (item) {
        if (item.likes.filter(item => item.userEmail === userEmail).length > 0 && item.likes.length === 1) {
          Like.deleteOne({ businessID })
            .then(item => {
              res.json({ userEmail: userEmail, businessID: businessID })
            })
            .catch(err => console.log(err))
        }
        if (item.likes.filter(item => item.userEmail === userEmail).length > 0 && item.likes.length > 1) {
          let updatedLikes = item.likes.filter(item => item.userEmail !== userEmail);
          item.likes = updatedLikes;

          item
            .save()
            .then(item => {
              res.json(item)
            })
            .catch(err => console.log(err));
        }
      }
    })
    .catch(err => res.state(404).json(err))
})



module.exports = router;