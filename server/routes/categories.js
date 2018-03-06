const express = require('express');
const router = express.Router();

const Category = require('../models/Category');
const Product = require('../models/Product');

router.get('/', (req, res, next) => {
  Category.find((err, categories) => {
    if (err) console.log(err);
    res.status(200).json(categories);
  });
});

router.get('/:category', (req, res, next) => {
  Category.findOne({ title: req.params.category }, (err, category) => {
    if (err) console.log(err);
    console.log(category);
    Product.find({ category: category.title }, (err, products) => {
      if (err) console.log(err);
      res.status(200).json(products);
    });
  });
});

module.exports = router;
