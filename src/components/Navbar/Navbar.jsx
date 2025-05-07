import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getAuthContext } from "../../context/authContext";
import Button from "../Button/Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

const Navbar = () => {
  const { user } = getAuthContext();
  const navigate = useNavigate();
  // Function to sign out user
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
      console.log("User has been signed out");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <nav className={styles.navbar}>
      {/* --------------------------------------- */}
      <div className={styles.firstRow}>
        <div className={styles.logo}>
          <img
            src="/public/icons/playstation-controller.svg"
            alt="playstation controller logo"
          />
        </div>
        {/* --------------------------------------- */}
        <div className={styles.cartHamburgerMenu}>
          {user ? (
            <Button className={styles.signOutButton} onClick={handleSignOut}>
              Sign out
            </Button>
          ) : (
            <Link to="/sign-in" className={styles.signInLink}>
              Sign in
            </Link>
          )}
          {user && (
            <Link to="/profile" className={styles.profileButton}>
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt="users own profile picture"
                  className={styles.profilePicture}
                />
              ) : (
                <FontAwesomeIcon icon={faUser} className={styles.profileIcon} />
              )}
            </Link>
          )}
          <Link className={styles.cartButton}>
            <FontAwesomeIcon icon={faCartPlus} className={styles.cartIcon} />
          </Link>
          <Button className={styles.hamburgerButton}>
            <FontAwesomeIcon
              icon={faBars}
              className={styles.hamburgerMenuIcon}
            />
          </Button>
        </div>
      </div>
      {/* -------------Second Row------------- */}
      <div className={styles.secondRow}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/games"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          Games
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
