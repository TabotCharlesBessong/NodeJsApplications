const express = require("express");
const {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getPublishedProduct,
} = require("../controller/product.controller");

const router = express.Router();

router.post("/new", addProduct);
router.get("/all", getAllProducts);
router.get("/:id", getOneProduct);
router.get("/ispub", getPublishedProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
