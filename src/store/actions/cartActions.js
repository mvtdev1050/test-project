export const addToCart = (product) => {
  console.log(product, "product");
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
};

export const addQTY = (id) => {
  return {
    type: "ADD_QUANTITY",
    payload: { id },
  };
};

export const decQTY = (id) => {
  return {
    type: "DEC_QUANTITY",
    payload: {
      id,
    },
  };
};

export const removeItem = (id) => {
  return {
    type: "REMOVE_ITEM",
    payload: {
      id,
    },
  };
};
