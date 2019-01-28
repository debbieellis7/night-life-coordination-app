const express = require('express');
const router = express.Router();

// Load Model
const Like = require('../../models/Like');




router.get('/', (req, res) => {
  Like.find()
    .then(item => {
      res.json(item)
    })
    .catch(err => console.log(err))
})










module.exports = router;