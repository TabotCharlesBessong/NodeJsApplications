const { where } = require("sequelize");
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

  const product = await Product.create(info);
  res.status(200).send(product);
  console.log(product);
};

// 2 getting all products
const getAllProducts = async (req, res) => {
  let products = await Product.findAll();
  res.status(201).send(products);
};

// 3 get a single product
const getOneProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ where: { id } });
  res.status(200).send(product);
};

// 4. update Product

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.update(req.body, { where: { id: id } });
  res.status(200).send(product);
};

// 5. delete product
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  await Product.destroy({ where: { id } });
  res.status(200).send("Product deleted successfully");
};

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
