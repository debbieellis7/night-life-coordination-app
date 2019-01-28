const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const likes = require('./routes/api/likes');
const unlikes = require('./routes/api/unlikes');
const votes = require('./routes/api/votes');

// Initialize Express
const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.set('useCreateIndex', true);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/auth', users);
app.use('/api/like', likes);
app.use('/api/unlike', unlikes);
app.use('/api/votes', votes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});