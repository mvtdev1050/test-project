import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { sendNotification } from "../utils/notifications";
import { addToCart } from "../store/actions/cartActions";
import api from "../utils/axios";
import Loader from "../components/loader";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Product = () => {
  const [product, setProduct] = useState({});
  const cartList = useSelector((state) => state?.cart);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userId, userList } = useLocalStorage();

  console.log(cartList, "cart");

  useEffect(() => {
    (async function () {
      try {
        let { data } = await api.get(`/${id}`);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  // useEffect(() => {
  //   if (
  //     userId !== undefined &&
  //     userList !== undefined &&
  //     cartList?.length !== 0
  //   ) {
  //     let updatedList = userList?.map((e) => {
  //       if (e.id == userId) {
  //         return {
  //           ...e,
  //           cart: cartList,
  //         };
  //       } else return e;
  //     });
  //     localStorage.setItem("users", JSON.stringify(updatedList));
  //   }
  // }, [cartList]);

  const handleAddtoCart = (product) => {
    if (userId === null) {
      sendNotification("warning", "Please Login to Proceed");
    } else {
      let cartItem = cartList.find((e, i) => e.id === product.id);
      if (cartItem) {
        sendNotification("warning", "Item is already added to cart");
      } else {
        dispatch(addToCart(product));
        if (
          userId !== undefined &&
          userList !== undefined &&
          cartList?.length !== 0
        ) {
          let updatedList = userList?.map((e) => {
            if (e.id == userId) {
              return {
                ...e,
                cart: cartList,
              };
            } else return e;
          });
          localStorage.setItem("users", JSON.stringify(updatedList));
        }
        sendNotification("success", "Item added to Cart Successfully");
      }
    }
  };

  return (
    <>
      {Object.keys(product).length === 0 ? (
        <Loader />
      ) : (
        <section className="common_section">
          <Container>
            <Row key={product?.id}>
              <Col className="col-10 col-md-6 m-auto mb-5 ">
                <div className="flexCenter">
                  <img
                    src={product?.image}
                    alt="product-img"
                    style={{ width: "80%" }}
                  />
                </div>
              </Col>
              <Col className="col-10 col-md-6 ">
                <div>
                  <h4 className="text-uppercase text-black-50">
                    {product?.category}
                  </h4>
                  <h1>{product?.title}</h1>
                  <h3>Rs. {product?.price}</h3>
                  <p>{product?.description}</p>
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => handleAddtoCart(product)}
                  >
                    Add to Cart
                  </button>
                  <Link to="/cart">
                    <button className="btn btn-dark mx-3 ">Go to Cart</button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </>
  );
};

export default Product;
