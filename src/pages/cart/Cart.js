import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../components/card/ProductCard";

const Cart = () => {
  const cartList = useSelector((state) => state?.cart);

  return (
    <section className="common_section">
      <ProductCard productList={cartList} />
    </section>
  );
};

export default Cart;
