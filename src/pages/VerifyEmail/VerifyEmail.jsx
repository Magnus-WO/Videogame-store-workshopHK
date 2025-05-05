import { useEffect, useState } from "react";
import styles from "./VerifyEmail.module.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebaseConfig";
import { sendEmailVerification } from "firebase/auth";
import Button from "../../components/Button/Button";

const VerifyEmail = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkVerificationStatus = async () => {
      await auth.currentUser.reload();
      setEmailVerified(auth.currentUser.emailVerified);
      if (auth.currentUser.emailVerified) {
        navigate("/games");
      }
    };
    const interval = setInterval(checkVerificationStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleResendVerification = async () => {
    setError(null);
    try {
      await sendEmailVerification(auth.currentUser);
      setEmailSent(true);
    } catch (error) {
      setError("Failed to resend the verification email");
    }
  };
  return (
    <div className={styles.verifyWrapper}>
      {emailVerified ? (
        <h1>Email verified 🎉 Redirecting to games page</h1>
      ) : (
        <div className={styles.verificationContainer}>
          <h2>
            Check your inbox and verify your email. After verifying the email,
            you will be automatically redirected to the games page.
          </h2>
          <p>
            If you havent recieved a email, click on the link below to resend it
          </p>
          <Button
            onClick={handleResendVerification}
            className={styles.resendButton}
          >
            Resend verification email
          </Button>
          {emailSent && (
            <p className={styles.successMessage}>
              A verification email has been sent, please check your inbox
            </p>
          )}
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
