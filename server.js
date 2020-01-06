const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

require('dotenv').config();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

// connect to mongodb
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () =>
  console.log('MongoDB database connection established successfully')
);

// set up routes
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder where react:build builds
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server is running on port ${port}`));
