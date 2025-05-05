import { useState } from "react";

const useSignUpValidation = () => {
  const [errors, setErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,}$/;

  const validate = (values) => {
    let newErrors = {};
    if (!values.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }
    if (!values.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    }
    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!values.password.trim()) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 8) {
      newErrors.password = "Password must be minimum 8 characters long";
    } else if (!passwordRegex.test(values.password)) {
      newErrors.password =
        "Password must include an uppercase, lowercase, number and a special character";
    }
    if (!values.confirmPassword.trim()) {
      newErrors.confirmPassword = "Password must be confirmed";
    }
    if (values.password !== values.confirmPassword) {
      newErrors.password = "Passwords must match";
      newErrors.confirmPassword = "Passwords must match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return { validate, errors };
};
export default useSignUpValidation;
