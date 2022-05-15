import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./EditDiscountForm.module.css";
import ImgEdit from "../../../assets/edit.png";
import ImgExit from "../../../assets/exit.png";
import { fetchEditDiscount } from "../../../api/queryDiscounts";

const propTypes = {
  discountData: PropTypes.object.isRequired,
  setDiscountData: PropTypes.func.isRequired,
  setShowEditDiscount: PropTypes.func.isRequired,
};

export default function EditDiscountForm({
  discountData,
  setDiscountData,
  setShowEditDiscount,
}) {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [backendMsg, setBackendMsg] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [newDiscountData, setNewDiscountData] = useState({
    id: null,
    name: "",
    discount: "",
    status: false,
  });

  useEffect(() => {
    if (discountData.id) {
      setNewDiscountData(discountData);
    }
  }, [discountData.id]);

  const submit = async () => {
    const res = await fetchEditDiscount(newDiscountData, signal);

    if (res.msg.success) {
      setDiscountData(newDiscountData);
    }

    setShowEditDiscount(false);
    setIsSubmit(false);
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
          value={newDiscountData.name}
          onChange={(e) =>
            setNewDiscountData({ ...newDiscountData, name: e.target.value })
          }
          placeholder="Nazwa"
          className={styles.form__input}
          type="text"
        />
      </td>
      <td>
        <input
          value={newDiscountData.discount}
          onChange={(e) =>
            setNewDiscountData({ ...newDiscountData, discount: e.target.value })
          }
          placeholder="Zniżka"
          className={styles.form__input}
          type="text"
        />
      </td>
      <td>
        <label className={styles.form__switch} htmlFor="toggleSwitch">
          <input
            checked={newDiscountData.status}
            onChange={(e) =>
              setNewDiscountData({
                ...newDiscountData,
                status: e.target.checked,
              })
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
