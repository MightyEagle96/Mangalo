const Product = require('../models/product');
const { catchAsync } = require('../utils/catchAsync');

exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  let queriedProduct = [];
  // to searcg a product by a title
  const { title } = req.query;
  if (title === undefined)
    res.status(200).json({ status: 'success', products });
  else {
    console.log(Object.values(products).map((el) => el.title));
    res.status(200).json({ status: 'getting your product' });
  }
};

exports.createProduct = catchAsync(async (req, res, next) => {
  await Product.create(req.body);
  res.status(201).json({ status: 'success', message: 'Product created' });
});
