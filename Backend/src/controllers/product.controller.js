const express = require("express");
const Product = require("../models/product.model");
const router = express.Router();

//to get all the products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().lean().exec();
    res.status(200).send({ productdata: products});
  } catch (error) {
    res.status(500).send({error: error.message });
  }
});

//to  create new product
router.post("/create", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).send({ productdata: product });
  } catch (error) {
    res.status(500).send({error: error.message });
  }
});

// to get single product by using  id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean().exec();
    return res.status(200).send({ productdata: product});
  } catch (error) {
    res.status(500).send({error: error.message });
  }
});


//edit product by id
router.patch("/:id/edit", async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true,}).lean().exec();
    return res.status(201).send({ productdata: product});
  } catch (error) {
    res.status(500).send({error: error.message });
  }
});

//delete product by id
router.delete("/:id/delete", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ productdata: product});
  } catch (error) {
    res.status(500).send({error: error.message });
  }
});

module.exports = router;