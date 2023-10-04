import React from "react";
import { Container } from "react-bootstrap";
import "./product.css";
import ProductCategory from "./ProductCategory";
import Productlist from "./ProductList";

const Products = () => {
  return (
    <section className="common_section">
      <Container>
        <ProductCategory />
        <Productlist />
      </Container>
    </section>
  );
};

export default Products;
