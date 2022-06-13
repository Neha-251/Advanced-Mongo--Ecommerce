const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
    {
        product_id: {type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true
        },
        ratings: { type: Array, required: true}

    }
)

const Rating = mongoose.model("rating", ratingSchema);
module.exports = Rating;