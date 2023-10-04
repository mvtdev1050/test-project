import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { fetchProducts } from "../../store/actions/productAction";
import "./product.css";
import ProductCategory from "./ProductCategory";
import Productlist from "./ProductList";
import Loader from "../loader";

const Products = () => {
  const productList = useSelector((state) => state?.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (!productList) return <Loader />;
  return (
    <Container>
      {/* -------------- categories ---------------- */}
      <ProductCategory />

      {/* --------------products mentioned here----------------------- */}
      <Productlist productList={productList} />
    </Container>
  );
};

export default Products;
