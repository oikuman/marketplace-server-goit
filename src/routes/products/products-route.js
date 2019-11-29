const fs = require("fs");
const path = require("path");

const productsRoute = (request, response) => {
  const filePath = path.join(
    __dirname,
    "../../",
    "db",
    "products",
    "all-products.json"
  );

  const products = fs.readFileSync(filePath, "utf-8");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Content-Type", "application/json");
  response.writeHead(200);
  response.end(products);
};

module.exports = productsRoute;
