const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');

const errorController = require('./controllers/errorController');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRoute');
const fileUploadRouter = require('./routes/fileUploadRouter');

const app = express();

// to post to db
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// app.use(express.static(__dirname + '/public'));

dotenv.config({ path: './config.env' });

const database = process.env.DATABASE;

mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('Database is connected'))
  .catch(() => console.log('Database not connected'));

// my routers
app.use('/products', productRouter);
app.use('/users', userRouter);
// app.use('/uploadCsv', fileUploadRouter);

// my error controller
app.use(errorController);
app.listen(2207, () => {
  console.log('app is listening of port 2207');
});
