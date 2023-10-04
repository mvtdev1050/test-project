import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { BsCart } from "react-icons/bs";

const Header = () => {
  const cart = useSelector((state) => state?.cart);
  return (
    <Navbar expand="lg" bg="light" data-bs-theme="light" sticky="top">
      <Container>
        <Navbar.Brand href="#home">Ecommerce-Website</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/" className="link mx-2">
              HOME
            </Link>
            <Link to="/cart" className="link mx-2">
              CART {cart?.length === 0 ? "" : `(${cart.length})`}
            </Link>
            <Link to="/signup" className="link mx-2">
              SIGNUP
            </Link>
            <Link to="/login" className="link mx-2">
              LOGIN
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
