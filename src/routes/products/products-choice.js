const products = require("./products");

const handleSingleProductById = id => {
  return products.find(product => product.id === id);
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

  if (id) chosenProducts = chosenProducts = handleSingleProductById(id);
  else if (query) {
    const { ids, category } = query;
    if (ids) chosenProducts = handleProductsByIds(ids);
    else if (category) chosenProducts = handleProductsByCategory(category);
  } else chosenProducts = [...products];

  return chosenProducts;
};

module.exports = {
  handleSingleProductById,
  handleProductsByIds,
  handleProductsByCategory,
  chooseProducts
};
