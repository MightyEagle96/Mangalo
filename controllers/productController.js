const fs = require('fs');
const parse = require('csv-parse');
const multer = require('multer');
const Product = require('../models/product');
const { catchAsync } = require('../utils/catchAsync');

exports.getProducts = async (req, res) => {
  const products = await Product.find();

  res.json({ length: products.length, products });
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body);
  res.json(product);
};

exports.createProduct = catchAsync(async (req, res) => {
  if (req.file) {
    const ext = req.file.mimetype.split('/')[1];
    console.log(ext);
    let newFileName;
    if (ext === 'csv') {
      newFileName = `file-${Date.now()}.${ext}`;
      fs.rename(req.file.path, `public/uploads/${newFileName}`, () => {});
      //   req.file.filename
      const parser = parse({ columns: true }, async (err, records) => {
        await Product.create(records);
        console.log(records.map((el) => el.reviews));
      });
      fs.createReadStream(`./public/uploads/${newFileName}`).pipe(parser);
    } else if (ext === 'json') {
      newFileName = `file-${Date.now()}.${ext}`;
      fs.rename(req.file.path, `public/uploads/${newFileName}`, () => {});
      fs.readFile(`./public/uploads/${newFileName}`, async (err, data) => {
        const products = JSON.parse(data);
        await Product.create(products);
      });
    }
  } else {
    console.log(req.body);
    await Product.create(req.body);
  }
  res.sendStatus(201);
});

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  await Product.findByIdAndDelete(id);
  res.sendStatus(204);
};
