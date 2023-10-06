import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { addQTY, decQTY, removeItem } from "../../store/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { sendNotification } from "../../utils/notifications";
import "./productcard.css";
import { AiOutlineClose } from "react-icons/ai";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const ProductCard = ({ productList }) => {
  const dispatch = useDispatch();
  const { userId, userList } = useLocalStorage();

  const cart = useSelector((state) => state?.cart);

  const handleDecrement = (id) => {
    dispatch(decQTY(id));
  };

  const handleIncrement = (id) => {
    dispatch(addQTY(id));
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
    if (userId !== undefined && userList !== undefined && cart?.length !== 0) {
      let updatedList = userList?.map((e) => {
        if (e.id == userId) {
          return {
            ...e,
            cart: cart,
          };
        } else return e;
      });
      localStorage.setItem("users", JSON.stringify(updatedList));
    }
    sendNotification("success", "Item Removed from Cart Successfully");
  };

  let subtotal = productList?.reduce((total, product) => {
    total = total + product?.qty * product?.price;
    return total;
  }, 0);

  const handleProceed = () => {
    sendNotification("success", "Thank you for visiting our website");
  };

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
              <Col className="flexGrid col-4">
                <img
                  src={product?.image}
                  alt="Product-image"
                  className="img-fluid product_img"
                />
              </Col>
              <Col className="col-8">
                <div>
                  <h1>{(product?.title).substring(0, 20)}</h1>
                  <span>Rs. {product?.price}</span>
                  <p>Total: {product?.qty * product?.price}</p>
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
        <div className="px-5 flexSB subtotal_container py-3 mb-5">
          <p className="p-0 m-0 ms-auto">
            <span className="p-0 m-0 text-uppercase font-weight-bolder">
              SubTotal
            </span>
            : Rs. {subtotal ? Math.floor(subtotal) : 0}
          </p>
        </div>
      ) : null}
      {cart?.length === 0 ? null : (
        <div className="text-center">
          <button className="btn btn-outline-dark" onClick={handleProceed}>
            Proceed To Checkout
          </button>
        </div>
      )}
    </Container>
  );
};

export default ProductCard;
