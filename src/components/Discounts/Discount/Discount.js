import PropTypes from "prop-types";
import { useContext, useState } from "react";
import styles from "./Discount.module.css";
import ReducerContext from "../../../context/Context";

const propTypes = {
  name: PropTypes.string.isRequired,
  discount: PropTypes.any.isRequired,
  status: PropTypes.any.isRequired,
};

export default function Discount({ name, discount, status }) {
  const [showEditCustomer, setShowEditCustomer] = useState(false);
  const stateGlobal = useContext(ReducerContext);

  return (
    <tr
      onDoubleClick={() => {
        setShowEditCustomer(true);
      }}
      className={`${styles.discount} ${styles[stateGlobal.state.theme] ?? ""} ${
        showEditCustomer ? styles.editDiscount : null
      }`}
    >
      {showEditCustomer ? (
        <>
          <td>edit</td>
          <td>edit</td>
          <td>edit</td>
        </>
      ) : (
        <>
          <td>{name}</td>
          <td>{`${discount}%`}</td>
          <td>{`${status}`}</td>
        </>
      )}
    </tr>
  );
}

Discount.propTypes = propTypes;
