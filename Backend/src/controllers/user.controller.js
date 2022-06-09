const express = require("express");
const User = require("../models/user.model");
const router = express.Router();

//to get all the users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    res.status(200).send({ data: users});
  } catch (error) {
    res.status(500).send({error: error.message });
  }
});

//to  create new user
router.post("/create", async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).send({ data: user });
  } catch (error) {
    res.status(500).send({message: "error"});
  }
});

// to get single user by using  id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean().exec();
    return res.status(200).send({ data: user});
  } catch (error) {
    res.status(500).send({error: error.message });
  }
});


//edit user by id
router.patch("/:id/edit", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true,}).lean().exec();
    return res.status(201).send({ data: user});
  } catch (error) {
    res.status(500).send({error: error.message });
  }
});

//get all addresses of the particulat user
router.get("/:id/addresses",async(req,res)=>{
  try {
      const user = await User.findById(req.params.id);
      const Addresses = user.addresses;
      return res.status(201).send({ data: Addresses});
  } 
  catch (error) {
      res.status(500).send({error: error.message });
  }
})

//create a new address for the particular user
router.patch("/:id/addresses/create", async (req, res) => {
  try {
    const update_Add = await User.updateOne(
      { _id: req.params.id },
      { $push: { addresses: req.body } }
    );
    if (update_Add.acknowledged === true) {
      const user = await User.findById(req.params.id).lean().exec();
      return res.status(201).send({ data: user.addresses});
    }
    return res.status(404).send({error: "something went wrong" });
  } catch (error) {
    res.status(500).send({error: error.message });
  }
});

//delete a particular address of the user by address_id
router.patch("/:id/addresses/:idx/edit", async (req, res) => {
  try {
    const delete_Add = await User.updateOne(
      { _id: req.params.id, "addresses._id": req.params.idx },
      { $set: { "addresses.$": req.body } }
    );
    if (delete_Add.acknowledged === true) {
      const user = await User.findById(req.params.id).lean().exec();
      return res.status(201).send({ data: user.addresses, message: "success" });
    }
    return res.status(404).send({ error: "something went wrong" });
  } catch (error) {
    res.status(500).send({error: error.message });
  }
});

//delete users by id
router.delete("/:id/delete", async (req, res) => {
  try {
    const user = await Category.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ userdata: user});
  } catch (error) {
    res.status(500).send({error: error.message });
  }
});

module.exports = router;