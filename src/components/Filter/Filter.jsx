import styles from "./Filter.module.css";

const Filter = () => {
  return (
    <>
      <select name="filter" id="filter" className={styles.filter}>
        <option value="">Filter by</option>
        <option value="onSale">On Sale</option>
        <option value="pc">Pc</option>
        <option value="xbox">Xbox</option>
        <option value="playstation">Playstation</option>
      </select>
    </>
  );
};

export default Filter;
