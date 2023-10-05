import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { BsCart, BsCartFill } from "react-icons/bs";
import "./header.css";

const Header = () => {
  const cart = useSelector((state) => state?.cart);

  const route = useLocation()?.pathname;
  // const { userId, logout } = useLocalStorage();
  return (
    <Navbar expand="lg" bg="light" data-bs-theme="light" sticky="top">
      <Container>
        <Navbar.Brand href="#home">Ecommerce-Website</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto  flexCenter">
            <Link
              to="/"
              className={` pt-2 mx-2 ${route === "/" ? "active" : "link"}`}
            >
              HOME
            </Link>
            <Link to="/cart" className="link mx-2">
              {route === "/cart" || route.split("/")[1] === "product" ? (
                <span className="cart_icon ">
                  <BsCartFill />
                </span>
              ) : (
                <span className="cart_icon ">
                  <BsCart />
                </span>
              )}
              <span className={cart?.length === 0 ? "" : "cart_count"}>
                {cart?.length === 0 ? "" : cart.length}
              </span>
            </Link>
            {/* {userId === null ? null : (
              <Link to="/user" className="link mx-2">
                USER
              </Link>
            )}
            {userId === null ? (
              <Link to="/signup" className="link mx-2">
                SIGNUP
              </Link>
            ) : null}
            {userId === null ? (
              <Link to="/login" className="link mx-2">
                LOGIN
              </Link>
            ) : (
              <Link
                to="/"
                className="link mx-2 cursor "
                onClick={() => logout()}
              >
                LOGOUT
              </Link>
            )} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
