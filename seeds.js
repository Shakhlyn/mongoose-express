const mongoose = require("mongoose");
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

// const liquidMilk = new Product({
//   name: "cow milk",
//   price: 100,
//   category: "milk",
// });

// liquidMilk
//   .save()
//   .then((msg) => console.log(msg))
//   .catch((e) => console.log(e));

seedProducts = [
  {
    name: "milk",
    price: 100,
    categoey: "milk",
  },
  {
    name: "UHT milk",
    price: 120,
    category: "milk",
  },
  {
    name: "brown rice",
    price: 60,
    category: "food",
  },
];

Product.insertMany(seedProducts)
  .then((d) => console.log(d))
  .catch((e) => console.log(e.message));
