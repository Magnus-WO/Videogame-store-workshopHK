import styles from "./Home.module.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <section className={styles.hero}>
      <header className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Games Horizon</h1>
        <p className={styles.heroSubtitle}>
          Games Horizon - Where Every Adventure Begins. Your Portal to Infinite
          Worlds. Play Beyond Limit. Play Beyond the Horizon
        </p>
        <Link
          to="/games"
          className={styles.ctaButton}
          aria-label="explore available games"
        >
          Explore Games
        </Link>
      </header>
    </section>
  );
};

export default Home;
