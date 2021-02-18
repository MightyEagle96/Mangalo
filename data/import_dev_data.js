const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/product');
// require('../')

dotenv.config({ path: '../config.env' });

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

// READ JSON FILE
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, 'utf-8')
);

// IMPORT DATA
const importData = async () => {
  try {
    await Product.create(products);
    console.log('Data imported');
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--import') importData();
