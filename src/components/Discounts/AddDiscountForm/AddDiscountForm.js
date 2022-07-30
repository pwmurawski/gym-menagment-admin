import PropTypes from "prop-types";
import { useContext } from "react";
import styles from "./AddDiscountForm.module.css";
import ReducerContext from "../../../context/Context";
import useAddDiscount from "../../../hooks/useAddDiscount";

const initFormData = {
  name: "",
  discount: "",
  status: false,
};

const propTypes = {
  discountsArray: PropTypes.array.isRequired,
  setDiscountsArray: PropTypes.func.isRequired,
};

export default function AddDiscountForm({ discountsArray, setDiscountsArray }) {
  const stateGlobal = useContext(ReducerContext);
  const [discountData, setDiscountData, addDiscount, backendMsg] =
    useAddDiscount(initFormData, discountsArray, setDiscountsArray);

  return (
    <>
      {backendMsg ? (
        <div
          className={`${styles.form__msg} ${
            backendMsg.status
              ? styles.form__msg_success
              : styles.form__msg_error
          }`}
        >
          {backendMsg.msg}
        </div>
      ) : null}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addDiscount();
        }}
        className={`${styles.form} ${styles[stateGlobal.state.theme] ?? ""}`}
      >
        <input
          value={discountData.name}
          onChange={(e) =>
            setDiscountData({ ...discountData, name: e.target.value })
          }
          placeholder="Nazwa"
          className={styles.form__input}
          type="text"
        />
        <input
          value={discountData.discount}
          onChange={(e) =>
            setDiscountData({ ...discountData, discount: e.target.value })
          }
          placeholder="Zniżka"
          className={styles.form__input}
          type="text"
        />
        <p className={styles.status__text}>Status</p>
        <label className={styles.form__switch} htmlFor="toggleSwitch">
          <input
            checked={discountData.status}
            onChange={(e) =>
              setDiscountData({ ...discountData, status: e.target.checked })
            }
            className={styles.form__checkbox}
            type="checkbox"
            name="toggleSwitch"
          />
          <span className={styles.form__slider} />
        </label>

        <button type="submit" className={styles.form__btn}>
          Dodaj
        </button>
      </form>
    </>
  );
}

AddDiscountForm.propTypes = propTypes;
