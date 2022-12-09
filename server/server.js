const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//making express server
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);


const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

app.use('/products', productsRouter);
app.use('/users', usersRouter);

//start the server to listen to 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});