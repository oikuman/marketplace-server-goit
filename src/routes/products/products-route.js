const fs = require("fs");
const path = require("path");
const products = require("./products");
const {
  handleSingleProductById,
  handleProductsByIds,
  handleProductsByCategory,
  chooseProducts
} = require("./products-choice");

const productsRoute = (request, response, urlObj) => {
  console.log(urlObj);

  const filePath = path.join(
    __dirname,
    "../../",
    "db",
    "products",
    "all-products.json"
  );
  let chosenProducts = chooseProducts(urlObj);

  //const products = fs.readFileSync(filePath, "utf-8");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Content-Type", "application/json");
  response.writeHead(200);
  //response.end(products);
  response.end(JSON.stringify(chosenProducts));
};

module.exports = productsRoute;
