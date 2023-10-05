import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { checkIfobjEmpty, validateForm } from "../../utils/validation";
import { sendNotification } from "../../utils/notifications";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const LoginForm = () => {
  const navigate = useNavigate();
  const { userList } = useLocalStorage();

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

    let noErrors = checkIfobjEmpty(formErrors);

    let currentUserId = "";
    let existUser = "";

    userList.forEach((e) => {
      if (e.email === user.email && e.password === user.password) {
        currentUserId = e.id;
        return (existUser = true);
      } else {
        return (existUser = false);
      }
    });

    console.log(noErrors, existUser);

    if (noErrors && existUser) {
      console.log("1111111111");
      localStorage.setItem("userId", currentUserId);
      sendNotification("success", "User Login Successfully");
      navigate("/user");
    } else {
      console.log("222222222");
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
