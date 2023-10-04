import axios from "axios";

export const BASE_URL = "https://fakestoreapi.com/products";

export default axios.create({
  baseURL: BASE_URL,
});
