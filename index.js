const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();

const Product = require("./models/products");

mongoose
  .connect("mongodb://127.0.0.1:27017/startup")
  .then(() => {
    console.log("Mongo connection is on!");
  })
  .catch((error) => {
    console.log("There is an error in Mongo Connection!!!");
    console.log(error);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Showing all the products
app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.render("./products/index", { products });
});

// Creating new product
app.get("/products/new", (req, res) => {
  // console.log("working");
  res.render("products/new");
});
// There is a problem I don't understand. if I keep showing function, create function is not working. Fortunately, I found the solution!!!

// ***SOLUTOIN: Here order is very important. Creating function must put befor showing-single-item function.
// If we put create function after show function, 'new' will be treated as a id, which can't be found.

app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.redirect(`products/${product._id}`);
});

// Showing a single product details
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/details", { product });
});

// Editing a product
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  res.redirect(`/products/${product._id}`);
  // res.redirect("/products");
});

// Deleting a product
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.listen(8080, () => console.log("Listening on port 8080"));
