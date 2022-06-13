const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const usersController = require("./controllers/user.controller");
const brandsController = require("./controllers/brand.controller");
const productsController = require("./controllers/product.controller");
const categoriesController = require("./controllers/category.controller");
const orderController = require("./controllers/order.controller");
const ratingController = require("./controllers/rating.controller");

app.use("/users", usersController);
app.use("/brands", brandsController);
app.use("/products", productsController);
app.use("/categories", categoriesController);
app.use("/orders", orderController);
app.use("/ratings", ratingController);

module.exports = app;