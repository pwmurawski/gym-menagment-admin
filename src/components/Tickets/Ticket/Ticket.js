import PropTypes from "prop-types";
import { useContext, useState } from "react";
import styles from "./Ticket.module.css";
import ReducerContext from "../../../context/Context";

const propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  activeDays: PropTypes.any.isRequired,
  status: PropTypes.bool.isRequired,
};

export default function Ticket({ name, price, activeDays, status }) {
  const [showEditCustomer, setShowEditCustomer] = useState(false);
  const stateGlobal = useContext(ReducerContext);

  return (
    <tr
      onDoubleClick={() => {
        setShowEditCustomer(true);
      }}
      className={`${styles.ticket} ${styles[stateGlobal.state.theme] ?? ""} ${
        showEditCustomer ? styles.editTicket : null
      }`}
    >
      {showEditCustomer ? (
        <>
          <td>edit</td>
          <td>edit</td>
          <td>edit</td>
          <td>edit</td>
        </>
      ) : (
        <>
          <td>{name}</td>
          <td>{`${price} zł`}</td>
          <td>{`${activeDays} ${activeDays === 1 ? "dzień" : "dni"}`}</td>
          <td>{`${status}`}</td>
        </>
      )}
    </tr>
  );
}

Ticket.propTypes = propTypes;
