const express = require('express');
const router = express.Router();
const faker = require('faker');

const Product = require('../../models/Product');
const Category = require('../../models/Category');

const imageByCategory = index => {
  switch (index) {
    case 0:
      return faker.image.fashion(500, 300);
      break;
    case 1:
      return faker.image.food(500, 300);
      break;
    case 2:
      return faker.image.sports(500, 300);
      break;
    case 3:
      return faker.image.technics(500, 300);
      break;
  }
};

router.get('/', (req, res, next) => {
  const categories = ['Fashion', 'Food', 'Sports', 'Technics'];
  for (let i = 0; i < 20; i++) {
    let index = Math.floor(Math.random() * categories.length);
    let product = new Product({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      category: categories[index],
      description: faker.lorem.paragraph(),
      image: imageByCategory(index),
    });

    product.save();
  }

  for (let i = 0; i < categories.length; i++) {
    let category = new Category({
      title: categories[i],
    });
    category.save();
  }

  res.redirect('/');
});

module.exports = router;
