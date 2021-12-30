import PropTypes from "prop-types";
import { useContext, useState } from "react";
import styles from "./Discount.module.css";
import ReducerContext from "../../../context/Context";
import EditDiscountForm from "../EditDiscountForm/EditDiscountForm";

const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  discount: PropTypes.any.isRequired,
  status: PropTypes.any.isRequired,
  discountsArray: PropTypes.array.isRequired,
  setDiscountsArray: PropTypes.func.isRequired,
};

export default function Discount({
  id,
  name,
  discount,
  status,
  discountsArray,
  setDiscountsArray,
}) {
  const [showEditDiscount, setShowEditDiscount] = useState(false);
  const stateGlobal = useContext(ReducerContext);

  return (
    <tr
      onDoubleClick={() => {
        setShowEditDiscount(true);
      }}
      className={`${styles.discount} ${styles[stateGlobal.state.theme] ?? ""} ${
        showEditDiscount ? styles.editDiscount : null
      }`}
    >
      {showEditDiscount ? (
        <EditDiscountForm
          id={id}
          name={name}
          discount={discount}
          status={status}
          setShowEditDiscount={setShowEditDiscount}
          discountsArray={discountsArray}
          setDiscountsArray={setDiscountsArray}
        />
      ) : (
        <>
          <td>{name}</td>
          <td>{`${discount}%`}</td>
          <td className={styles.container__discountStatus}>
            <div
              className={`${styles.discount__status} ${
                status
                  ? styles.discount__status_active
                  : styles.discount__status_notActive
              }`}
            />
          </td>
        </>
      )}
    </tr>
  );
}

Discount.propTypes = propTypes;
