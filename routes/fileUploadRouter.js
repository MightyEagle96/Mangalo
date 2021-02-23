const express = require('express');
const parse = require('csv-parse');
const multer = require('multer');
const fs = require('fs');

const Product = require('../models/product');
const upload = multer({ dest: 'public/uploads' });

const router = express.Router();

router.post('/', upload.single('products'), (req, res, next) => {
  // to rename the file we have
  const ext = req.file.mimetype.split('/')[1];

  const newFileName = `file-${Date.now()}.${ext}`;
  fs.rename(req.file.path, `public/uploads/${newFileName}`, () => {});

  //   req.file.filename
  const parser = parse({ columns: true }, async (err, records) => {
    // await Product.create(records);
    console.log(records.map((el) => el.reviews));
  });
  fs.createReadStream(`./public/uploads/${newFileName}`).pipe(parser);

  res.send('here we are');
});
module.exports = router;
