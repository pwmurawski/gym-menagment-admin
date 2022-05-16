import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import styles from "./AddCustomerForm.module.css";
import ReducerContext from "../../../context/Context";
import { fetchAddCustomer } from "../../../api/queryCustomers";
import HomeContext from "../../../context/HomeContext";

const initFormData = {
  firstName: "",
  lastName: "",
  number: "",
  discountId: "",
  code: "",
  ticketType: "",
};

const propTypes = {
  tablePage: PropTypes.object.isRequired,
};

export default function AddCustomerForm({ tablePage }) {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [backendMsg, setBackendMsg] = useState(null);
  const [customerData, setCustomerData] = useState(initFormData);
  const [isSubmit, setIsSubmit] = useState(false);
  const homeCon = useContext(HomeContext);
  const { discountsArray, ticketsArray } = homeCon.state;
  const { dispatch } = homeCon;
  const stateGlobal = useContext(ReducerContext);

  const submit = async () => {
    const res = await fetchAddCustomer(customerData, signal);

    if (res?.msg.success) {
      setCustomerData(initFormData);
      setBackendMsg({
        msg: res.msg.success,
        status: true,
      });

      if (tablePage.currentPage !== tablePage.totalPages - 1) {
        dispatch({
          type: "addBeginCustomerNotLastPage",
          customer: res.customer,
        });
      } else {
        dispatch({
          type: "addBeginCustomer",
          customer: res.customer,
        });
      }
    }

    if (res?.msg.error) {
      setBackendMsg({
        msg: res.msg.error,
        status: false,
      });
    }
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
      {backendMsg ? (
        <div
          className={`${styles.form__msg} ${
            backendMsg.status
              ? styles.form__msg_success
              : styles.form__msg_error
          }`}
        >
          {backendMsg.msg}
        </div>
      ) : null}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmit(true);
        }}
        className={`${styles.form} ${styles[stateGlobal.state.theme] ?? ""}`}
      >
        <input
          value={customerData.firstName}
          onChange={(e) =>
            setCustomerData({ ...customerData, firstName: e.target.value })
          }
          placeholder="Imie"
          className={styles.form__input}
          type="text"
        />
        <input
          value={customerData.lastName}
          onChange={(e) =>
            setCustomerData({ ...customerData, lastName: e.target.value })
          }
          placeholder="Nazwisko"
          className={styles.form__input}
          type="text"
        />
        <input
          value={customerData.number}
          onChange={(e) =>
            setCustomerData({ ...customerData, number: e.target.value })
          }
          placeholder="Numer"
          className={styles.form__input}
          type="text"
        />
        <input
          value={customerData.code}
          onChange={(e) =>
            setCustomerData({ ...customerData, code: e.target.value })
          }
          placeholder="Code"
          className={styles.form__input}
          type="text"
        />
        <select
          value={customerData.ticketType}
          onChange={(e) =>
            setCustomerData({ ...customerData, ticketType: e.target.value })
          }
          className={styles.form__select}
          name="ticket"
        >
          <option>Karnet</option>
          {ticketsArray?.map((ticket) => (
            <option key={ticket.id} value={ticket.id} disabled={!ticket.status}>
              {`${ticket.name} | ${ticket.activeDays} ${
                ticket.activeDays === 1 ? "dzień" : "dni"
              } | ${ticket.price}zł`}
            </option>
          ))}
        </select>
        <select
          value={customerData.discountId}
          onChange={(e) =>
            setCustomerData({ ...customerData, discountId: e.target.value })
          }
          className={styles.form__select}
          name="discount"
        >
          <option>Znizka</option>
          {discountsArray?.map((discount) => (
            <option
              key={discount.id}
              value={discount.id}
              disabled={!discount.status}
            >
              {`${discount.name} | ${discount.discount}%`}
            </option>
          ))}
        </select>
        <button type="submit" className={styles.form__btn}>
          Dodaj
        </button>
      </form>
    </>
  );
}

AddCustomerForm.propTypes = propTypes;
