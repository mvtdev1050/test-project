import React from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import "./product.css";
import defaultProductImg from "../../assets/images/photo-1591047139829-d91aecb6caea.avif";

const Productlist = ({ productList }) => {
  const navigate = useNavigate();

  const handleGoTo = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <Row>
      {productList?.length
        ? productList.map((product) => {
            return (
              <Col key={product?.id} md={4} className="product_card_column">
                <div className="shadow-sm pb-3 product_card_container ">
                  <div className="product_card flexCenter">
                    <img
                      src={product?.image ? product.image : defaultProductImg}
                      alt="product-image"
                    />
                  </div>
                  <div className="product_details mt-4 px-4 ">
                    <h4>{product?.title?.substring(0, 40)}</h4>
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
  );
};

export default Productlist;
