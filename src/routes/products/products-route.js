const fs = require("fs");
const path = require("path");
const products = require("./products");

const findProductById = id => {
  return products.find(item => item.id === id);
};

const productsRoute = (request, response, checkedUrl) => {
  console.log(checkedUrl);

  // path.query["category"]
  // path.query["ids"]
  const filePath = path.join(
    __dirname,
    "../../",
    "db",
    "products",
    "all-products.json"
  );

  //const products = fs.readFileSync(filePath, "utf-8");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Content-Type", "application/json");
  response.writeHead(200);
  //response.end(products);
  response.end(JSON.stringify(products));
};

module.exports = productsRoute;
