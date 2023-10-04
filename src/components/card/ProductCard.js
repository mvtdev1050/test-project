import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { addQTY, decQTY, removeItem } from "../../store/actions/cartActions";
import { useDispatch } from "react-redux";
import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { sendNotification } from "../../utils/notifications";
import "./productcard.css";
import { AiOutlineClose } from "react-icons/ai";

const ProductCard = ({ productList }) => {
  const dispatch = useDispatch();

  const handleDecrement = (id) => {
    dispatch(decQTY(id));
  };

  const handleIncrement = (id) => {
    console.log(id, "id");
    dispatch(addQTY(id));
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
    sendNotification("success", "Item Removed from Cart Successfully");
  };

  let subtotal = productList?.reduce((total, product) => {
    total = total + product?.qty * product?.price;
    return total;
  }, 0);

  return (
    <Container>
      {productList?.length ? (
        productList?.map((product) => {
          return (
            <Row className="mb-5 shadow-sm  product_row" key={product?.id}>
              <p className="m-0  p-0 px-3 flexCenter">
                <AiOutlineClose
                  className="ms-auto cursor"
                  onClick={() => handleRemove(product?.id)}
                />
              </p>
              <Col className="flexGrid">
                <img
                  src={product?.image}
                  alt="Product-image"
                  className="img-fluid product_img"
                />
              </Col>
              <Col>
                <div>
                  <h1>{(product?.title).substring(0, 20)}</h1>
                  <div className="flexSB">
                    <span>Rs. {product?.price}</span>
                    <p>Total: {product?.qty * product?.price}</p>
                  </div>
                  <div className="mb-3">
                    <button
                      className="custom-counter"
                      disabled={product?.qty === 0 ? true : false}
                      onClick={() => handleDecrement(product?.id)}
                    >
                      -
                    </button>
                    <button
                      className="custom-counter "
                      style={{ backgroundColor: "white" }}
                    >
                      {product?.qty}
                    </button>
                    <button
                      className="custom-counter "
                      onClick={() => handleIncrement(product?.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          );
        })
      ) : (
        <div className="flexCenter" style={{ flexDirection: "column" }}>
          <BsCart style={{ fontSize: "100px" }} />
          <Link to="/" className="mt-5">
            <button className="btn btn-outline-dark">Go to Shopping</button>
          </Link>
        </div>
      )}

      {productList?.length ? (
        <div className="px-5 flexSB subtotal_container py-3">
          <p className="p-0 m-0 ms-auto">
            <span className="p-0 m-0 text-uppercase font-weight-bolder">
              SubTotal
            </span>
            : Rs. {subtotal ? Math.floor(subtotal) : 0}
          </p>
        </div>
      ) : null}
    </Container>
  );
};

export default ProductCard;
