const express = require("express");
const Order = require("../models/order.model");
const router = express.Router();

router.post("/create", async(req, res) => {
    try{
        const order = await Order.create(req.body);
        return res.status(200).send({order: order});

    }
    catch(err) {
        return res.status(400).send({error: err.message});
    }
})

router.get("", async(req, res) => {
    try{
        const order = await Order.find().lean().exec();

        return res.status(200).send({orderData: order});
    }
    catch(err) {
        return res.status(400).send({error: err.message})
    }
})

router.get("/getOne", async(req, res) => {
    try{
        let user_id = req.query.user_id;

        const order = await Order.find({user_id: { $eq: user_id}}).lean().exec();


        const sum = await Order.aggregate([
             { "$project": {
                user_id: user_id,
                "TotalPrice": {
                   $sum: "$products.price"
                   }
                }}
             ]);

        return res.status(200).send({order: order, sum});
    }
    catch(err) {
        return res.status(400).send({error: err.message})
    }
})


router.patch("/edit/products", async(req, res) => {
    try{

        let userId = req.query.userId;
        let foodId = req.query.foodId;

        const order = await Order.update({
            user_id: userId
          },
          {
            $pull: {
              products: {
                _id: foodId
              }
            }
          })
        return res.status(200).send({order: order});
    }
    catch(err) {
        console.log('err', err)
    }
})


router.delete("/delete/:id", async(req, res) => {
    try{

        const order = await Order.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(order);
    }
    catch(err) {
        return res.status(400).send({error: err.message});
    }
})


module.exports = router;