const { chooseProducts, prepareResponse } = require("./products-choice");

const productsRoute = (request, response, urlObj) => {
  console.log(urlObj);

  let chosenProducts = chooseProducts(urlObj);
  const preparedResponse = prepareResponse(chosenProducts);

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Content-Type", "application/json");
  response.writeHead(200);
  response.end(JSON.stringify(preparedResponse));
};

module.exports = productsRoute;
