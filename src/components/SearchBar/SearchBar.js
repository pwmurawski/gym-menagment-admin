import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";
import searchImg from "../../assets/search.png";
import ReducerContext from "../../context/Context";

export default function SearchBar() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState({
    search: " ",
    searchFor: "",
  });
  const stateGlobal = useContext(ReducerContext);
  const mediaQuery = window.matchMedia("(max-width: 760px)");
  const [isMediaMatch, setIsMediaMatch] = useState(!!mediaQuery.matches);
  const [searchBtnClick, setSearchBtnClick] = useState(false);
  const navigate = useNavigate();

  const search = async () => {
    if (!(formData.search === "")) {
      navigate(`/wyszukaj/${formData.search}${formData.searchFor}`);
    } else {
      navigate("/");
    }
  };

  const searchBtnHandler = () => {
    if (!searchBtnClick) setSearchBtnClick(true);
    else setSearchBtnClick(false);
  };

  const mediaMenuHidden = () => {
    const resizeHandler = () => {
      if (mediaQuery.matches) setIsMediaMatch(true);
      else setIsMediaMatch(false);
    };

    window.addEventListener("resize", resizeHandler);
  };

  useEffect(() => {
    mediaMenuHidden();
    return () => {
      window.removeEventListener("resize");
    };
  }, []);

  useEffect(() => {
    if (formData.search !== " ") {
      search();
    }
  }, [formData.search, isSubmit]);

  return (
    <>
      {isMediaMatch ? (
        <button
          onClick={searchBtnHandler}
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
            setIsSubmit(!isSubmit);
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
