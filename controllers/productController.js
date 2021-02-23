const fs = require('fs');
const parse = require('csv-parse');
const multer = require('multer');
const Product = require('../models/product');
const { catchAsync } = require('../utils/catchAsync');

exports.getProducts = async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({ status: 'success', products });
};

exports.createProduct = catchAsync(async (req, res, next) => {
  console.log(req.file);
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
    } else {
      await Product.create(req.body);
    }
  }
  res.status(201).json({ status: 'success', message: 'Product created' });
});
