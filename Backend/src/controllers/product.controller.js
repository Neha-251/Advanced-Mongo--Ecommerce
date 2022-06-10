const express = require("express");
const Product = require("../models/product.model");
const router = express.Router();

//to get all the products
router.get("", async (req, res) => {
  try {

    //filters:  1) category, 2) description,
    //sorts: 1) price, 

    let page = req.query.page || 6;
    let pagesize = req.query.pagesize || 5;
    let cat = req.query.cat;
    let desc = req.query.desc;
    let sort = req.query.sort;

    const skip = (page - 1) * pagesize;

    if (desc !== "all" && cat !== "all") {
      const products = await Product.find({ $and: [{$match: { categories: {$elemMatch: { categories_id: {cat_name: {$eq: cat}}} }}}, { description: { $eq: desc } }] }).skip(skip).limit(pagesize).sort({ price: sort }).populate("categories.categories_id").lean().exec();
      const total_pages = Math.ceil(await Product.find({ $and: [{ category: { $eq: cat } }, { description: { $eq: desc } }] }).countDocuments()) / pagesize;
      res.status(200).send({ productdata: products, total_pages });

    }

    else if (cat == "all" && desc !== "all") {

      const products = await Product.find({ description: { $eq: desc } }).skip(skip).limit(pagesize).sort({ price: sort }).populate("categories.categories_id").lean().exec();
      const total_pages = Math.ceil(await Product.find({ description: { $eq: desc } }).countDocuments()) / pagesize;
      res.status(200).send({ productdata: products, total_pages });

    }
    else if (desc === "all" && cat !== "all") {

      const products = await Product.find({ categories: { $elemMatch: { "categories_id.cat_name": cat} } }).skip(skip).limit(pagesize).sort({ price: sort }).populate("categories.categories_id").lean().exec();
      const total_pages = Math.ceil(await Product.find({ categories: { $elemMatch: { "categories_id.cat_name": cat} } }).countDocuments()) / pagesize;
      res.status(200).send({ productdata: products, total_pages });

    }
    else {

      const products = await Product.find().skip(skip).limit(pagesize).sort({ price: sort }).populate("categories.categories_id").lean().exec();
      const total_pages = Math.round(await Product.find().countDocuments()) / pagesize;

      res.status(200).send({ productdata: products, total_pages });
    }



  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//to  create new product
router.post("/create", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).send({ productdata: product });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// to get single product by using  id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean().exec();
    return res.status(200).send({ productdata: product });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


//edit product by id
router.patch("/:id/edit", async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, }).lean().exec();
    return res.status(201).send({ productdata: product });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//delete product by id
router.delete("/:id/delete", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ productdata: product });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;