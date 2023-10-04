import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { fetchProducts } from "../../store/actions/productAction";
import "./product.css";

const Products = () => {
  const productList = useSelector((state) => state?.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleGoTo = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <Container>
      <Row>
        {productList?.length
          ? productList.map((product) => {
              return (
                <Col key={product?.id} md={4} className="product_card_column">
                  <div className="shadow-sm pb-3 product_card_container ">
                    <div className="product_card flexCenter">
                      <img src={product?.image} alt="product-image" />
                    </div>
                    <div className="product_details mt-4 px-4">
                      <h3>{(product?.title).substring(0, 30)}</h3>
                      <p>Rs. {product?.price}</p>
                      <button
                        className="btn btn-outline-dark"
                        onClick={() => handleGoTo(product?.id)}
                      >
                        BUY NOW
                      </button>
                    </div>
                  </div>
                </Col>
              );
            })
          : "No Products"}
      </Row>
    </Container>
  );
};

export default Products;
