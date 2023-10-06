import api from "../../utils/axios";

export const fetchProducts = () => async (dispatch) => {
  try {
    let { data } = await api.get();
    dispatch({ type: "FETCH_DATA", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const filterByCategory = (category) => async (dispatch) => {
  try {
    let { data } = await api.get(`/category/${category}`);
    dispatch({ type: "FILTER_BY_CATEGORY", payload: data });
  } catch (error) {
    console.log(error);
  }
};
