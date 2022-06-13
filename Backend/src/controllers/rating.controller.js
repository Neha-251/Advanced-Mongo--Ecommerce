const express = require("express");
const Rating = require("../models/rating.model");
const router = express.Router();


router.get("", async(req, res) => {
    try{
        let prodId = req.query.prodId;

        // const rating = await Rating.find({product_id: {$eq: prodId}}).populate("product_id")
        // .lean().exec();

        const avg = await Rating.aggregate([
            { "$project": {
                product_id: prodId,
                "ratingAvg": { $avg: "$ratings"} } }
        ])

        // const avg = await Rating.aggregate([
        //     { "$match": {product_id: prodId,  
        //         $avg: "$ratings"}}
        // ])
        const count = await Rating.aggregate([
            {$project: { 
                product_id: prodId,
                "count": { $size:"$ratings" }}}])

        return res.status(200).send({rating: avg, count});

    }
    catch(err) {
        return res.status(400).send({error: err.message})
    }
})


module.exports = router;