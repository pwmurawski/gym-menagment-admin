import PropTypes from "prop-types";
import { useState, useContext, useEffect } from "react";
import EditCustomer from "../EditCustomer/EditCustomer";
import styles from "./Customer.module.css";
import ReducerContext from "../../../context/Context";
import randomColor from "../../../helpers/randomColor";

const propTypes = {
  customerDataProps: PropTypes.object.isRequired,
  discountArray: PropTypes.array.isRequired,
  ticketArray: PropTypes.array.isRequired,
  deleteCustomer: PropTypes.func.isRequired,
};

export default function Customer({
  customerDataProps,
  discountArray,
  ticketArray,
  deleteCustomer,
}) {
  const stateGlobal = useContext(ReducerContext);
  const [showEditCustomer, setShowEditCustomer] = useState(false);
  const [customerData, setCustomerData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    number: "",
    ticket: {},
    discount: {},
  });
  const ticketDateTo = new Date(customerData.ticket.dateTo);

  useEffect(() => {
    if (customerDataProps.id) {
      setCustomerData(customerDataProps);
    }
  }, [customerDataProps.id]);

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
          customerData={customerData}
          setCustomerData={setCustomerData}
          discountArray={discountArray}
          ticketArray={ticketArray}
          setShowEditCustomer={setShowEditCustomer}
          deleteCustomer={deleteCustomer}
        />
      ) : (
        <>
          <td className={`${styles.name} ${styles.customerItem}`}>
            <p className={styles.tooltip}>Kliknij 2 razy aby edytowac</p>
            <div className={styles.name__containerIcon}>
              <div
                className={styles.name__icon}
                style={{ backgroundColor: randomColor() }}
              >{`${customerData.firstName[0]}${customerData.lastName[0]}`}</div>
            </div>
            <div className={styles.name__containerText}>
              <p className={styles.name__text}>{customerData.firstName}</p>
              <p className={styles.name__text}>{customerData.lastName}</p>
            </div>
          </td>
          <td className={styles.customerItem}>
            <p className={styles.tooltip}>Kliknij 2 razy aby edytowac</p>
            {customerData.number}
          </td>
          <td className={styles.customerItem}>
            <p className={styles.tooltip}>Kliknij 2 razy aby edytowac</p>
            <p className={styles.customerItem__text}>
              {customerData.ticket.name}
            </p>
            <p
              className={styles.customerItem__text}
            >{`Cena:${customerData.ticket.finalPrice} zł`}</p>
          </td>
          <td className={styles.customerItem}>
            <p className={styles.tooltip}>Kliknij 2 razy aby edytowac</p>
            <p className={styles.customerItem__text}>
              {customerData.discount.name}
            </p>
            <p
              className={styles.customerItem__text}
            >{`${customerData.discount.discount}%`}</p>
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
