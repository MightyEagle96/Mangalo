require('dotenv').config({ path: './config.env' });
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const errorController = require('./controllers/errorController');
const authController = require('./controllers/authController');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRoute');
const viewRouter = require('./routes/viewRoute');
// const fileUploadRouter = require('./routes/fileUploadRouter');
const initializePassport = require('./passport-config');

initializePassport(passport);
const app = express();

// to post to db via postman or a rest file
app.set('view-engine', 'pug');
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(bodyParser.json());

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

app.use('/', viewRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);
// app.use('/uploadCsv', fileUploadRouter);

// my error controller
app.use(errorController);
app.listen(2207, () => {
  console.log('app is listening of port 2207');
});
