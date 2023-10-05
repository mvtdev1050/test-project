import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Loader from "../../components/loader";

const User = () => {
  const { currentUser } = useLocalStorage();

  if (currentUser === undefined) return <Loader />;
  return (
    <section className="common_section">
      <Container>
        <div className="user_details">
          <h1>Name: {currentUser?.name}</h1>
          <h1>Email: {currentUser?.email}</h1>
          <h1>Phone: {currentUser?.phone}</h1>
        </div>
      </Container>
    </section>
  );
};

export default User;
