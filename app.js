const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const errorController = require('./controllers/errorController');
const productRouter = require('./routes/productRouter');

const app = express();
const router = express.Router();

// to post to db
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

dotenv.config({ path: './config.env' });

const database = process.env.DATABASE;

mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Database is connected'))
  .catch(() => console.log('Database not connected'));

// my routers
app.use('/products', productRouter);

// my error controller
app.use(errorController);
app.listen(2207, () => {
  console.log('app is listening of port 2207');
});
