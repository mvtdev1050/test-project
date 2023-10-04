import axios from "axios";

export const fetchCategories = () => async (dispatch) => {
  try {
    let { data } = await axios.get(
      `https://fakestoreapi.com/products/categories`
    );
    dispatch({ type: "FETCH_CATEGORIES", payload: data });
  } catch (error) {
    console.log(error);
  }
};
