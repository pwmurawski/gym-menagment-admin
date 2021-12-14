import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import EditCustomer from "../../EditCustomer/EditCustomer";
import styles from "./Customer.module.css";

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
  const fristNameIconRef = useRef(null);

  useEffect(() => {
    const hue = Math.floor(Math.random() * 360);
    const pastel = `hsl(${hue}, 100%, 70%)`;
    fristNameIconRef.current.style.backgroundColor = pastel;
  }, []);

  return (
    <tr
      onDoubleClick={() => {
        setShowEditCustomer(true);
      }}
      style={
        showEditCustomer ? { backgroundColor: "rgb(219, 238, 255)" } : null
      }
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
          <td className={`${styles.fristName} ${styles.customerItem}`}>
            <div className={styles.tooltip}>Kliknij 2 razy aby edytowac</div>
            <div className={styles.fristName__containerIcon}>
              <div
                ref={fristNameIconRef}
                className={styles.fristName__icon}
              >{`${firstName[0]}${lastName[0]}`}</div>
            </div>
            <p className={styles.firstName__text}>{firstName}</p>
          </td>
          <td className={styles.customerItem}>
            <div className={styles.tooltip}>Kliknij 2 razy aby edytowac</div>
            {lastName}
          </td>
          <td className={styles.customerItem}>
            <div className={styles.tooltip}>Kliknij 2 razy aby edytowac</div>
            {number}
          </td>
          <td className={styles.customerItem}>
            <div className={styles.tooltip}>Kliknij 2 razy aby edytowac</div>
            {`${ticket.name} | Cena:${ticket.finalPrice} zł`}
          </td>
          <td className={styles.customerItem}>
            <div className={styles.tooltip}>Kliknij 2 razy aby edytowac</div>
            {`${discount.name} | ${discount.discount}%`}
          </td>
          <td className={styles.customerItem}>
            <div className={styles.tooltip}>Kliknij 2 razy aby edytowac</div>
            {ticket.dateTo}
          </td>
        </>
      )}
    </tr>
  );
}

Customer.propTypes = propTypes;
