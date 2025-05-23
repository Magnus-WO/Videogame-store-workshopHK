import styles from "./GameItem.module.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

const GameItem = ({ game }) => {
  return (
    <div className={styles.gameCard}>
      <div className={styles.imageContainer}>
        <img
          src={game.imageUrl}
          alt={game.title}
          className={styles.gameImage}
        />
      </div>
      {/* ------------------------------ */}
      <h2 className={styles.gameTitle}>{game.title}</h2>
      <p className={styles.gameGenre}>
        <b>Genre: </b>
        {game.genre}
      </p>
      {/* --------------- */}
      <p className={styles.gameYear}>
        <b>Release year:</b> {game.releaseYear}
      </p>
      {/* --------------- */}
      <p className={styles.gameRating}>
        <b>Rating:</b> {game.rating}
      </p>
      {/* --------------- */}
      <p className={styles.gamePrice}>
        <b>Price: </b>
        {game.price}
      </p>
      {/* --------------- */}
      <Link to={`/games/${game.id}`} className={styles.gameLink}>
        Details
      </Link>
      <Button className={styles.addToCartBtn}>Add to cart</Button>
    </div>
  );
};

export default GameItem;
