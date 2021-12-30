import PropTypes from "prop-types";
import { useState, useContext, useEffect } from "react";
import EditCustomer from "../EditCustomer/EditCustomer";
import styles from "./Customer.module.css";
import ReducerContext from "../../../context/Context";
import randomColor from "../../../helpers/randomColor";

const propTypes = {
  id: PropTypes.number.isRequired,
  customersArray: PropTypes.array.isRequired,
  setCustomersArray: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  ticket: PropTypes.object.isRequired,
  discount: PropTypes.object.isRequired,
  discountArray: PropTypes.array.isRequired,
  ticketArray: PropTypes.array.isRequired,
};

export default function Customer({
  id,
  customersArray,
  setCustomersArray,
  discountArray,
  ticketArray,
  firstName,
  lastName,
  number,
  ticket,
  discount,
}) {
  const [showEditCustomer, setShowEditCustomer] = useState(false);
  const stateGlobal = useContext(ReducerContext);
  const ticketDateTo = new Date(ticket.dateTo);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <tr
      onDoubleClick={() => {
        setShowEditCustomer(true);
      }}
      className={`${styles.customer} ${styles[stateGlobal.state.theme] ?? ""} ${
        showEditCustomer ? styles.editCustomer : ""
      }`}
    >
      {showEditCustomer ? (
        <EditCustomer
          id={id}
          setShowEditCustomer={setShowEditCustomer}
          customersArray={customersArray}
          setCustomersArray={setCustomersArray}
          discountArray={discountArray}
          ticketArray={ticketArray}
          firstName={firstName}
          lastName={lastName}
          number={number}
          ticket={ticket}
          discount={discount}
        />
      ) : (
        <>
          <td className={`${styles.name} ${styles.customerItem}`}>
            <p className={styles.tooltip}>Kliknij 2 razy aby edytowac</p>
            <div className={styles.name__containerIcon}>
              <div
                className={styles.name__icon}
                style={{ backgroundColor: randomColor() }}
              >{`${firstName[0]}${lastName[0]}`}</div>
            </div>
            <div className={styles.name__containerText}>
              <p className={styles.name__text}>{firstName}</p>
              <p className={styles.name__text}>{lastName}</p>
            </div>
          </td>
          <td className={styles.customerItem}>
            <p className={styles.tooltip}>Kliknij 2 razy aby edytowac</p>
            {number}
          </td>
          <td className={styles.customerItem}>
            <p className={styles.tooltip}>Kliknij 2 razy aby edytowac</p>
            <p className={styles.customerItem__text}>{ticket.name}</p>
            <p
              className={styles.customerItem__text}
            >{`Cena:${ticket.finalPrice} zł`}</p>
          </td>
          <td className={styles.customerItem}>
            <p className={styles.tooltip}>Kliknij 2 razy aby edytowac</p>
            <p className={styles.customerItem__text}>{discount.name}</p>
            <p
              className={styles.customerItem__text}
            >{`${discount.discount}%`}</p>
          </td>
          <td className={styles.customerItem}>
            <p className={styles.tooltip}>Kliknij 2 razy aby edytowac</p>
            {`${ticketDateTo.getDate()} | ${
              ticketDateTo.getMonth() + 1
            } | ${ticketDateTo.getFullYear()}`}
          </td>
        </>
      )}
    </tr>
  );
}

Customer.propTypes = propTypes;
