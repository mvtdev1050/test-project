export const categoryReducer = (state = [], { type, payload }) => {
  switch (type) {
    case "FETCH_CATEGORIES":
      return payload;
    default:
      return state;
  }
};
