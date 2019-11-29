const mainRoute = require("./main/main");
const productsRoute = require("./products/products-route");
const signUpRoute = require("./users/sign-up-route");

const router = {
  "/signup": signUpRoute,
  "/products": productsRoute,
  default: mainRoute
};

module.exports = router;
