export const validateForm = (obj) => {
  let error = {};

  let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let mobileRegex = /^([+]\d{2})?\d{10}$/;

  if (obj.name === "") {
    error.name = "This field is required";
  } else {
    error.name = "";
  }
  if (obj.email === "") {
    error.email = "This field is required";
  } else if (!emailRegex.test(obj.email)) {
    error.email = "Please enter valid email";
  } else {
    error.email = "";
  }
  if (obj.phone === "") {
    error.phone = "This field is required";
  } else if (!mobileRegex.test(obj.phone)) {
    error.phone = "Please enter valid mobile Number";
  } else {
    error.phone = "";
  }
  if (obj.password === "") {
    error.password = "This field is required";
  } else if (obj.password.trim().length < 3) {
    error.password = "Please Enter a valid password";
  } else {
    error.password = "";
  }

  return error;
};
