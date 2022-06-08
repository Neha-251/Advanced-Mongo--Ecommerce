const express = require("express");
const Brand = require("../models/brand.model");
const router = express.Router();

//to get all the brands
router.get("/", async (req, res) => {
  try {
    const brand = await Brand.find().lean().exec();
    res.status(200).send({ branddata: brand});
  } catch (error) {
    res.status(500).send({error: error.message });
  }
});

//to  create new brand
router.post("/create", async (req, res) => {
  try {
    const brand = await Brand.create(req.body);
    return res.status(201).send({ branddata: brand});
  } catch (error) {
    res.status(500).send({error: error.message });
  }
});

// to get single brand by using  id
router.get("/:id", async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id).lean().exec();
    return res.status(200).send({ branddata: brand});
  } catch (error) {
    res.status(500).send({error: error.message });
  }
});


//edit brand by id
router.patch("/:id/edit", async (req, res) => {
  try {
    const brand = await Brand.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true,}).lean().exec();
    return res.status(201).send({ branddata: brand});
  } catch (error) {
    res.status(500).send({error: error.message });
  }
});

//delete brand by id
router.delete("/:id/delete", async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ branddata: brand});
  } catch (error) {
    res.status(500).send({error: error.message });
  }
});

module.exports = router;