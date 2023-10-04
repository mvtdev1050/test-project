const cartReducer = (state = [], { type, payload }) => {
  switch (type) {
    case "ADD_TO_CART":
      let cartItem = state.find((e) => e.id === payload.id);
      if (cartItem) {
        return state;
      } else {
        let tempArr = [...state];
        tempArr.push({ ...payload, qty: 1 });
        return tempArr;
      }
    case "ADD_QUANTITY":
      return state.map((e) => {
        if (e.id === payload?.id) {
          return {
            ...e,
            qty: e.qty + 1,
          };
        } else return e;
      });
    case "DEC_QUANTITY":
      return state.map((e) => {
        if (e.id === payload?.id) {
          return {
            ...e,
            qty: e.qty - 1,
          };
        } else return e;
      });
    case "REMOVE_ITEM":
      return state.filter((product) => product.id !== payload.id);
    default:
      return state;
  }
};

export default cartReducer;
