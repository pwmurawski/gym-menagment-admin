import PropTypes from "prop-types";
import styles from "./EditDiscountForm.module.css";
import ImgEdit from "../../../assets/edit.png";
import ImgExit from "../../../assets/exit.png";
import useEditDiscount from "../../../hooks/useEditDiscount";

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
  const [newDiscountData, setNewDiscountData, editDiscount] = useEditDiscount(
    discountData,
    setDiscountData
  );

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
            editDiscount();
            setShowEditDiscount(false);
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
