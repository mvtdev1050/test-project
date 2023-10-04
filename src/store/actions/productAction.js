import api from "../../config/index";

export const fetchProducts = () => async (dispatch) => {
  try {
    let { data } = await api.get();
    // let { data } = await axios.get("https://fakestoreapi.com/products");

    dispatch({ type: "FETCH_DATA", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchSingleProduct = (id) => async (dispatch) => {
  try {
    let { data } = await api.get(`/${id}`);
    // let { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);

    let tempArr = [];
    tempArr.push(data);
    dispatch({ type: "FETCH_SINGLE_PRODUCT", payload: tempArr });
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
