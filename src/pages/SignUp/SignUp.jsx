import styles from "./SignUp.module.css";
import Button from "../../components/Button/Button";

import { useState, useRef } from "react";
import useSignUpValidation from "../../hooks/useSignUpValidation";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  // Declaring state for storing the form data
  const [signUpFormData, setSignUpFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    profilePicture: null,
    previewUrl: "",
  });
  const fileInputRef = useRef(null);

  // Validation function
  const { validate, errors } = useSignUpValidation();

  // User sign up function
  const { signUp, signUpError } = useAuth();

  // Redirection
  const navigate = useNavigate();

  // Fetch data from input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpFormData((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Fetch the image file and create a temporary url
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setSignUpFormData((prevDetails) => ({
        ...prevDetails,
        profilePicture: file,
        previewUrl: previewUrl,
      }));
      console.log("Selected file:", file);
    } else {
      setSignUpFormData((prevDetails) => ({
        ...prevDetails,
        profilePicture: null,
        previewUrl: "",
      }));
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setSignUpFormData((prevDetails) => ({
      ...prevDetails,
      profilePicture: null,
      previewUrl: "",
    }));
    fileInputRef.current.value = "";
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(signUpFormData)) {
      console.log("form validation failed");
      return;
    }
    const userCredentials = await signUp(
      signUpFormData.email,
      signUpFormData.password
    );
    navigate("/verify-email");
    console.log("Account created successfully!", userCredentials.user);
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.signUpForm} noValidate onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupTitle}>
            Personal Information
          </legend>
          {/* -------------------------------- */}
          <label htmlFor="firstname">First name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter your first name"
            className={styles.formInput}
            maxLength={50}
            onChange={handleInputChange}
            value={signUpFormData.firstname}
          />
          {errors && <p className={styles.errorMessage}>{errors.firstname}</p>}
          {/* -------------------------------- */}
          <label htmlFor="lastname">Last name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter your last name"
            className={styles.formInput}
            maxLength={50}
            onChange={handleInputChange}
            value={signUpFormData.lastname}
          />
          {errors && <p className={styles.errorMessage}>{errors.lastname}</p>}
          {/* -------------------------------- */}
          <label htmlFor="dateOfBirth">Date of birth </label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            className={styles.formInput}
            onChange={handleInputChange}
            value={signUpFormData.dateOfBirth}
          />
          {errors && (
            <p className={styles.errorMessage}>{errors.dateOfBirth}</p>
          )}
          {/* -------------------------------- */}
          <label htmlFor="profilePicture">Profile picture</label>
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            className={styles.formInput}
            accept=".jpg, .jpeg, .png"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          {signUpFormData.previewUrl && (
            <div className={styles.imagePreviewContainer}>
              <img
                src={signUpFormData.previewUrl}
                alt="Profile pitcure preview"
                className={styles.imagePreview}
              />
              <button
                className={styles.removeImageButton}
                type="button"
                onClick={handleRemoveImage}
              >
                Remove image
              </button>
            </div>
          )}
        </fieldset>
        {/* -------------------------------- */}
        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupTitle}>Account Details</legend>
          {/* -------------------------------- */}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className={styles.formInput}
            maxLength={100}
            onChange={handleInputChange}
            value={signUpFormData.email}
          />
          {errors && <p className={styles.errorMessage}>{errors.email}</p>}
          {/* -------------------------------- */}
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className={styles.formInput}
            maxLength={100}
            onChange={handleInputChange}
            value={signUpFormData.password}
          />
          {errors && <p className={styles.errorMessage}>{errors.password}</p>}
          {/* -------------------------------- */}
          <label htmlFor="confirmPassword">password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm your password"
            className={styles.formInput}
            maxLength={100}
            onChange={handleInputChange}
            value={signUpFormData.confirmPassword}
          />{" "}
          {errors && (
            <p className={styles.errorMessage}>{errors.confirmPassword}</p>
          )}
        </fieldset>
        <Button className={styles.createAccountButton}>Create account</Button>
      </form>
    </div>
  );
};

export default SignUp;
