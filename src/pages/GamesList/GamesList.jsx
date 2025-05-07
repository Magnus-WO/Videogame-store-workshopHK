import { useFetchGames } from "../../hooks/useFetchGames";
import styles from "./GamesList.module.css";
import Sort from "../../components/Sort/Sort";
import Filter from "../../components/Filter/Filter";
import GameItem from "../../components/GameItem/GameItem";

const GamesList = () => {
  const games = useFetchGames();
  console.log(games);

  return (
    <div className={styles.gamesWrapper}>
      <div className={styles.sortFilterContainer}>
        <Sort></Sort>
        <Filter></Filter>
      </div>
      {/* ----------------------------------- */}
      <ul className={styles.gamesContainer}>
        {games.map((game) => {
          return <GameItem game={game} key={game.id} />;
        })}
      </ul>
    </div>
  );
};

export default GamesList;
