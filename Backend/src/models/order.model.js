const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema(
    {
        user_id: {type: String, required: true},
        products: [
            {
                name: { type: String, required: true },
                image: { type: String, required: true },
                description: { type: String, required: false },
                price: { type: Number, required: true }
            },
        ],
        user: {
            first_name: { type: String, required: true },
            last_name: { type: String, required: false },
            email: { type: String, required: true },
            password: { type: String, required: true },
        },
        address: {
            line: { type: String, required: true },
            area: { type: String, required: false },
            city: { type: String, required: true },
            state: { type: String, required: true },
            address_type: { type: String, required: false },
        }
    }
)

const Order = mongoose.model("order", orderSchema);

module.exports = Order;