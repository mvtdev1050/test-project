import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import { categoryReducer } from "./categoryReducer";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  categories: categoryReducer,
});

export default rootReducer;
