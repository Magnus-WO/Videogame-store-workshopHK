import styles from "./GameDetails.module.css";
import Button from "../../components/Button/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../../firebaseConfig";
const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState({});

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameRef = doc(database, "games", id);
        const gameSnap = await getDoc(gameRef);

        if (gameSnap.exists()) {
          setGame(gameSnap.data());
        } else {
          console.log("Game not found");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchGameDetails();
  }, [id]);

  const availablePlatforms = game.platforms
    ? Object.keys(game.platforms).filter((platform) => game.platforms[platform])
    : [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.gameDetailsContainer}>
        <div className={styles.gameDescriptionContainer}>
          <h2>{game.title}</h2>
          <p>
            <strong>Genre: </strong>
            {game.title}
          </p>
          <p>
            <strong>Overview: </strong>
            {game.overview}
          </p>
          <p>
            <strong>Release year: </strong>
            {game.releaseYear}
          </p>
          <p>
            <strong>Producer: </strong>
            {game.releasedBy}
          </p>
          <p>
            <strong>Rating: </strong>
            {game.rating}
          </p>
          <p>
            <strong>Price: </strong>
            {game.price}
          </p>
          <p>
            <strong>Available platforms: </strong>
            {availablePlatforms.join(", ")}
          </p>
          <Button className={styles.addToCartBtn}>Add to cart</Button>
        </div>
        <div className={styles.gameImageContainer}>
          <img
            src={game.imageUrl}
            alt={game.title}
            className={styles.gameImage}
          />
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
