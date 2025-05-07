import { Link, useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
import Button from "../../components/Button/Button";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import useSignInValidation from "../../hooks/useSignInValidation";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig";

const SignIn = () => {
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });

  // Destructuring sign in validation and errors
  const { validateSignIn, signInErrors } = useSignInValidation();

  // For redirection
  const navigate = useNavigate();

  // Retrieve sign-in form values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignInFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Sign users in
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateSignIn(signInFormData)) {
      console.log("form is not valid");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signInFormData.email,
        signInFormData.password
      );
      const user = userCredential.user;
      console.log("successfully signed in", user);
      navigate("/games");
      setSignInFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Reset password
  const handlePasswordReset = async (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    e.preventDefault();
    if (!resetEmail.trim()) {
      setResetMessage("Email is required to reset your password");
      // return;
    } else if (!emailRegex.test(resetEmail.trim())) {
      setResetMessage("Please enter a valid email address");
      // return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      console.log("password reset sent");

      setResetMessage(
        "An email with the password reset has been sent to your email, please check your inbox"
      );
      setResetEmail("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.signInForm} noValidate onSubmit={handleSignIn}>
        <h2>Sign-in form</h2>
        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupTitle}>Account details</legend>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            className={styles.formInput}
            onChange={handleInputChange}
            value={signInFormData.email}
          />
          {signInErrors && (
            <p className={styles.errorMessage}>{signInErrors.email}</p>
          )}
          {/* ------------------------ */}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className={styles.formInput}
            onChange={handleInputChange}
            value={signInFormData.password}
          />
          {signInErrors && (
            <p className={styles.errorMessage}>{signInErrors.password}</p>
          )}
        </fieldset>
        {/* ------------------------ */}
        <p>
          Dont have an account? Create one <Link to="/sign-up">here</Link>
        </p>
        <p>
          Forgot your password? Reset it{" "}
          <Button
            className={styles.forgotPasswordButton}
            type="button"
            onClick={() => {
              setShowForgotPasswordModal(true);
            }}
          >
            here
          </Button>
        </p>
        <Button type="submit" className={styles.signInButton}>
          Sign in
        </Button>
      </form>
      {/* ------------------------ */}
      {showForgotPasswordModal && (
        <Modal>
          <form className={styles.resetFormContainer}>
            <p>
              Please enter your email address and press "reset". You will
              recieve an email with instructions to reset your password. Follow
              the link in the email to set a new password.
            </p>
            <label htmlFor="resetEmail">Email</label>
            <input
              type="email"
              id="resetEmail"
              name="resetEmail"
              placeholder="Enter your email address"
              className={styles.formInput}
              onChange={(e) => {
                setResetEmail(e.target.value);
              }}
              value={resetEmail}
            />
            <div className={styles.resetButtonsContainer}>
              <Button
                type="submit"
                className={styles.resetPasswordButton}
                onClick={handlePasswordReset}
              >
                Reset
              </Button>
              <Button
                type="button"
                className={styles.closeButton}
                onClick={() => {
                  setShowForgotPasswordModal(false);
                  setResetMessage("");
                  setResetEmail("");
                }}
              >
                Close
              </Button>
            </div>
            {resetMessage && (
              <p className={styles.errorMessage}>{resetMessage}</p>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
};

export default SignIn;
