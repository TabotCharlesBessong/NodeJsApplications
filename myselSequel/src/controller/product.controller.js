const db = require("../models");

const Product = db.products;
const Review = db.reviews;

// 1. create a product
const addProduct = async (req, res) => {
  let info = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published,
  };

  const product = await Product.create(info)
  res.status(200).send(product)
  console.log(product)
};

// 2 getting all products
const getAllProducts = async (req,res) => {
  let products = await Product.findAll()
  res.status(201).send(products)
}

module.exports = {addProduct,getAllProducts}
