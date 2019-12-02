const path = require("path");
const fs = require("fs");

const filePath = path.join(
  __dirname,
  "../../",
  "db",
  "products",
  "all-products.json"
);

const getProducts = filePath => {
  const productString = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(productString);
};

const products = getProducts(filePath);

const handleSingleProductById = id => {
  return [products.find(product => product.id === id)];
};

const handleProductsByIds = ids => {
  const idArray = ids.split(",");
  return products.reduce((acc, product) => {
    if (idArray.includes(product.id)) acc = [...acc, product];
    return acc;
  }, []);
};

const handleProductsByCategory = category => {
  return products.reduce((acc, product) => {
    if (product.categories.includes(category)) acc = [...acc, product];
    return acc;
  }, []);
};

const chooseProducts = urlObj => {
  let chosenProducts = [];
  const { id, query } = urlObj;

  if (id) {
    chosenProducts = handleSingleProductById(id);
    console.log(chosenProducts);
  } else if (query) {
    const { ids, category } = query;
    if (ids) chosenProducts = handleProductsByIds(ids);
    else if (category) chosenProducts = handleProductsByCategory(category);
  } else chosenProducts = [...products];

  return chosenProducts;
};

const prepareResponse = chosenProducts => {
  let serverResponse = null;

  if (!chosenProducts || !chosenProducts.length)
    serverResponse = { status: "no products", products: [] };
  else serverResponse = { status: "success", products: chosenProducts };

  return serverResponse;
};

module.exports = {
  chooseProducts,
  prepareResponse
};
