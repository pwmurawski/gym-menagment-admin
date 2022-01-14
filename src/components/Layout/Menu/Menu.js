import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Menu.module.css";
import imgLogo from "../../../assets/logo.png";
import imgKarnet from "../../../assets/karnet.png";
import imgPrice from "../../../assets/price-tag.png";
import imgUser from "../../../assets/user.png";
import imgCustomer from "../../../assets/customer.png";
import ReducerContext from "../../../context/Context";

export default function Menu() {
  const stateGlobal = useContext(ReducerContext);
  const mediaQuery = window.matchMedia("(max-width: 760px)");

  const onClickLinkHandler = () => {
    if (mediaQuery.matches) {
      stateGlobal.dispatch({ type: "click-menuBtn" });
    }
  };

  return (
    <div
      className={`${styles.menu} ${
        stateGlobal.state.menuBtnClick ? styles.menu_openMenu : ""
      } ${styles[stateGlobal.state.theme] ?? ""}`}
    >
      <div className={styles.menu__logo}>
        <img className={styles.logo__img} src={imgLogo} alt="logo" />
        <h1 className={styles.logo__title}>Gym</h1>
      </div>
      <ul className={styles.menu__list}>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.link_active : styles.link
          }
          to="/"
          onClick={onClickLinkHandler}
        >
          <li className={styles.list__item}>
            <img
              className={styles.item__img}
              src={imgCustomer}
              alt="customers"
            />
            <p className={styles.list__item__text}>Strona główna</p>
          </li>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.link_active : styles.link
          }
          to="ticket"
          onClick={onClickLinkHandler}
        >
          <li className={styles.list__item}>
            <img className={styles.item__img} src={imgKarnet} alt="ticket" />
            <p className={styles.list__item__text}>Karnet</p>
          </li>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.link_active : styles.link
          }
          to="discount"
          onClick={onClickLinkHandler}
        >
          <li className={styles.list__item}>
            <img className={styles.item__img} src={imgPrice} alt="price" />
            <p className={styles.list__item__text}>Znizka</p>
          </li>
        </NavLink>
        <li className={styles.list__item}>
          <img className={styles.item__img} src={imgUser} alt="user" />
          <p className={styles.list__item__text}>Konto</p>
        </li>
      </ul>
    </div>
  );
}
