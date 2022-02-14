import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./EditDiscountForm.module.css";
import FetchApi from "../../../helpers/fetchApi";
import ImgEdit from "../../../assets/edit.png";
import ImgExit from "../../../assets/exit.png";

const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  discount: PropTypes.any.isRequired,
  status: PropTypes.bool.isRequired,
  setShowEditDiscount: PropTypes.func.isRequired,
  discountsArray: PropTypes.array.isRequired,
  setDiscountsArray: PropTypes.func.isRequired,
};

export default function EditDiscountForm({
  id,
  name,
  discount,
  status,
  setShowEditDiscount,
  discountsArray,
  setDiscountsArray,
}) {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [discountData, setDiscountData] = useState({
    id,
    name,
    discount,
    status,
  });
  const [backendMsg, setBackendMsg] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const submit = async () => {
    FetchApi(
      "/discount/edit",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        signal,
        body: JSON.stringify(discountData),
      },
      (res) => {
        if (res.msg.success) {
          discountsArray.forEach((e) => {
            if (e.id === id) {
              e.id = discountData.id;
              e.name = discountData.name;
              e.discount = discountData.discount;
              e.status = discountData.status;
            }
          });

          setDiscountsArray([...discountsArray]);
        }

        setShowEditDiscount(false);
        setIsSubmit(false);
      }
    );
  };

  useEffect(() => {
    if (isSubmit) {
      submit();
    }

    return () => {
      abortController.abort();
    };
  }, [isSubmit]);

  useEffect(() => {
    if (backendMsg) {
      const timeOut = setTimeout(() => {
        setBackendMsg(null);
      }, 5000);
      return () => {
        clearTimeout(timeOut);
      };
    }

    return null;
  }, [backendMsg]);

  return (
    <>
      <td>
        <input
          value={discountData.name}
          onChange={(e) =>
            setDiscountData({ ...discountData, name: e.target.value })
          }
          placeholder="Nazwa"
          className={styles.form__input}
          type="text"
        />
      </td>
      <td>
        <input
          value={discountData.discount}
          onChange={(e) =>
            setDiscountData({ ...discountData, discount: e.target.value })
          }
          placeholder="Zniżka"
          className={styles.form__input}
          type="text"
        />
      </td>
      <td>
        <label className={styles.form__switch} htmlFor="toggleSwitch">
          <input
            defaultChecked={status}
            onChange={(e) =>
              setDiscountData({ ...discountData, status: e.target.checked })
            }
            className={styles.form__checkbox}
            type="checkbox"
            name="toggleSwitch"
          />
          <span className={styles.form__slider} />
        </label>
      </td>
      <td className={styles.form__btnContainer}>
        <button
          type="submit"
          onClick={() => {
            setIsSubmit(true);
          }}
          className={`${styles.form__btn} ${styles.form__btn_edit}`}
        >
          <img className={styles.form__btn__icon} src={ImgEdit} alt="edit" />
          <p className={styles.tooltip}>Zapisz</p>
        </button>
        <button
          type="button"
          onClick={() => {
            setShowEditDiscount(false);
          }}
          className={`${styles.form__btn} ${styles.form__btn_exit}`}
        >
          <img className={styles.form__btn__icon} src={ImgExit} alt="edit" />
          <p className={styles.tooltip}>Wyjdz</p>
        </button>
      </td>
    </>
  );
}

EditDiscountForm.propTypes = propTypes;
