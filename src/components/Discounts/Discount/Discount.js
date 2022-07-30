import PropTypes from "prop-types";
import { useContext, useState } from "react";
import styles from "./Discount.module.css";
import ReducerContext from "../../../context/Context";
import EditDiscountForm from "../EditDiscountForm/EditDiscountForm";
import useInitStateProps from "../../../hooks/useInitStateProps";

const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  discount: PropTypes.any.isRequired,
  status: PropTypes.any.isRequired,
};

export default function Discount({ id, name, discount, status }) {
  const stateGlobal = useContext(ReducerContext);
  const [showEditDiscount, setShowEditDiscount] = useState(false);
  const [discountData, setDiscountData] = useInitStateProps(id, {
    id,
    name,
    discount,
    status,
  });

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
          discountData={discountData}
          setDiscountData={setDiscountData}
          setShowEditDiscount={setShowEditDiscount}
        />
      ) : (
        <>
          <td>{discountData.name}</td>
          <td>{`${discountData.discount}%`}</td>
          <td className={styles.container__discountStatus}>
            <div
              className={`${styles.discount__status} ${
                discountData.status
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
