import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchSingleProduct } from "../store/actions/productAction";
import { Col, Container, Row } from "react-bootstrap";
import { sendNotification } from "../utils/notifications";
import { addToCart } from "../store/actions/cartActions";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state?.products);
  const cartList = useSelector((state) => state?.cart);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [id]);

  const handleAddtoCart = (product) => {
    let cartItem = cartList.find((e, i) => e.id === product.id);
    if (cartItem) {
      sendNotification("warning", "Item is already added to cart");
    } else {
      dispatch(addToCart(product));
      sendNotification("success", "Item added to Cart Successfully");
    }
  };

  return (
    <section className="common_section">
      <Container>
        {productList?.length
          ? productList.map((product) => {
              return (
                <Row key={product?.id}>
                  <Col>
                    <div className="flexCenter">
                      <img
                        src={product?.image}
                        alt="product-img"
                        style={{ width: "80%" }}
                      />
                    </div>
                  </Col>
                  <Col>
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
                        <button className="btn btn-dark mx-3 ">
                          Go to Cart
                        </button>
                      </Link>
                    </div>
                  </Col>
                </Row>
              );
            })
          : null}
      </Container>
    </section>
  );
};

export default Product;
