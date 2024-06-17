require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:3000', 'https://personal-bookshelf-server.vercel.app', 'https://personal-bookshelf-tan.vercel.app'],
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};


const app = express();

app.use(cors(corsOptions));
app.use(express.json());

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('MONGODB_URI is not defined');
  process.exit(1); // Exit the process with a failure code
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
