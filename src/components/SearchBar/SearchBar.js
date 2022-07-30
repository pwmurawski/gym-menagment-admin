import { useContext, useState } from "react";
import styles from "./SearchBar.module.css";
import searchImg from "../../assets/search.png";
import ReducerContext from "../../context/Context";
import useMediaQueries from "../../hooks/useMediaQueries";
import useSearchForm from "../../hooks/useSearchForm";

export default function SearchBar() {
  const stateGlobal = useContext(ReducerContext);
  const isMediaMatch = useMediaQueries("(max-width: 760px)");
  const [searchBtnClick, setSearchBtnClick] = useState(false);
  const [formData, setFormData, search] = useSearchForm();

  return (
    <>
      {isMediaMatch ? (
        <button
          onClick={() => setSearchBtnClick(!searchBtnClick)}
          type="button"
          className={styles.searchBtn}
        >
          <img className={styles.btn__img} src={searchImg} alt="search" />
        </button>
      ) : null}

      {searchBtnClick || !isMediaMatch ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            search();
          }}
          className={`${styles.search} ${
            styles[stateGlobal.state.theme] ?? ""
          }`}
        >
          <input
            onChange={(e) =>
              setFormData({ ...formData, search: e.target.value })
            }
            className={styles.search__input}
            type="text"
            placeholder="Szukaj..."
          />
          <select
            onChange={(e) =>
              setFormData({ ...formData, searchFor: e.target.value })
            }
            className={styles.search__select}
          >
            <option value="">Szukaj po...</option>
            <option value="&f=firstName">Imie</option>
            <option value="">Nazwisko</option>
            <option value="&f=code">Code</option>
          </select>
          <button type="submit" className={styles.search__btn}>
            <img className={styles.btn__img} src={searchImg} alt="search" />
          </button>
        </form>
      ) : null}
    </>
  );
}
