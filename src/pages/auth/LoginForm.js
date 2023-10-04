import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { validateForm } from "../../utils/validation";
import { sendNotification } from "../../utils/notifications";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setErrors(validateForm(user));
    }
  }, [user]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm(user);
    setErrors(formErrors);

    let usersList = JSON.parse(localStorage.getItem("users"));
    console.log(usersList);

    let existUser = usersList.filter((e) => {
      if (e.email === user.email && e.password === user.password) {
        return true;
      } else {
        return false;
      }
    });

    if (Object.keys(formErrors).length === 0 && existUser) {
      sendNotification("success", "User Created Successfully");
      navigate("/login");
    } else {
      sendNotification("danger", "User not exist");
    }
  };

  return (
    <section className="common_section">
      <Container>
        <div className=" flexCenter">
          <form className="p-5 soft_theme">
            <h1 className="mb-4 text-center">Login Form</h1>
            <div className="mb-3">
              <input
                type="text"
                className="px-2"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder=" Email .........."
              />
            </div>
            <p className="text-danger">{errors?.email ? errors.email : ""}</p>

            <div className="mb-3">
              <input
                type="text"
                className="px-2"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder=" Password .........."
              />
            </div>
            <p className="text-danger">
              {errors?.password ? errors.password : ""}
            </p>
            <button className="btn btn-dark w-100 mb-3" onClick={handleSubmit}>
              SUBMIT
            </button>
            <Link to="/signup">
              <button className="btn btn-outline-dark w-100">SIGNUP</button>
            </Link>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default LoginForm;
