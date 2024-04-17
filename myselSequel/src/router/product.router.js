const express = require("express")
const { addProduct, getAllProducts } = require("../controller/product.controller")

const router = express.Router()

router.post("/new",addProduct)
router.get("/all",getAllProducts)

module.exports = router