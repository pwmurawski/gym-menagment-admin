/* eslint-disable no-param-reassign */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import FetchApi from "../../helpers/fetchApi";
import styles from "./EditCustomer.module.css";

const propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  discount: PropTypes.object.isRequired,
  ticket: PropTypes.object.isRequired,
  setShowEditCustomer: PropTypes.func.isRequired,
  customersArray: PropTypes.array.isRequired,
  setCustomersArray: PropTypes.func.isRequired,
  discountArray: PropTypes.array.isRequired,
  ticketArray: PropTypes.array.isRequired,
};

export default function EditCustomer({
  id,
  firstName,
  lastName,
  number,
  discount,
  ticket,
  setShowEditCustomer,
  customersArray,
  setCustomersArray,
  discountArray,
  ticketArray,
}) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [customerData, setCustomerData] = useState({
    firstName,
    lastName,
    number,
    discountId: discount.id,
    code: ticket.code,
    ticketType: ticket.ticketTypeId,
  });

  const submit = async (signal) => {
    FetchApi(
      `/customer/${id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        signal,
        body: JSON.stringify(customerData),
      },
      (res) => {
        if (res.msg.success) {
          customersArray.forEach((element) => {
            if (element.id === id) {
              element.id = res.customer.id;
              element.firstName = res.customer.firstName;
              element.lastName = res.customer.lastName;
              element.number = res.customer.number;
              element.ticket = res.customer.ticket;
              element.discount = res.customer.discount;
            }
          });
          setCustomersArray([...customersArray]);
          setShowEditCustomer(false);
        }
        setIsSubmit(false);
      }
    );
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    if (isSubmit) {
      submit(signal);
    }

    return () => {
      abortController.abort();
    };
  }, [isSubmit]);

  return (
    <>
      <td>
        <input
          value={customerData.firstName}
          onChange={(e) =>
            setCustomerData({ ...customerData, firstName: e.target.value })
          }
          placeholder="Imie"
          className={`${styles.form__input} ${styles.form__input_first}`}
          type="text"
        />
      </td>
      <td>
        <input
          value={customerData.lastName}
          onChange={(e) =>
            setCustomerData({ ...customerData, lastName: e.target.value })
          }
          placeholder="Nazwisko"
          className={styles.form__input}
          type="text"
        />
      </td>
      <td>
        <input
          value={customerData.number}
          onChange={(e) =>
            setCustomerData({ ...customerData, number: e.target.value })
          }
          placeholder="Numer"
          className={styles.form__input}
          type="text"
        />
      </td>
      <td>
        <input
          value={customerData.code}
          onChange={(e) =>
            setCustomerData({ ...customerData, code: e.target.value })
          }
          placeholder="Code"
          className={styles.form__input}
          type="text"
        />
      </td>
      <td>
        <select
          value={customerData.ticketType}
          onChange={(e) =>
            setCustomerData({ ...customerData, ticketType: e.target.value })
          }
          className={styles.form__select}
          name="ticket"
        >
          <option>Karnet</option>
          {ticketArray.map((ticketEl) => (
            <option
              key={ticketEl.id}
              value={ticketEl.id}
              price={ticketEl.price}
              activedays={ticketEl.activeDays}
              disabled={!ticketEl.status}
            >
              {`${ticketEl.name} | ${ticketEl.activeDays} ${
                ticketEl.activeDays === 1 ? "dzień" : "dni"
              } | ${ticketEl.price}zł`}
            </option>
          ))}
        </select>
      </td>
      <td>
        <select
          value={customerData.discountId}
          onChange={(e) =>
            setCustomerData({ ...customerData, discountId: e.target.value })
          }
          className={styles.form__select}
          name="discount"
        >
          <option>Znizka</option>
          {discountArray.map((discountEl) => (
            <option
              key={discountEl.id}
              value={discountEl.id}
              discount={discountEl.discount}
              disabled={!discountEl.status}
            >
              {`${discountEl.name} | ${discountEl.discount}%`}
            </option>
          ))}
        </select>
      </td>
      <td>
        <button
          type="submit"
          onClick={() => {
            setIsSubmit(true);
          }}
          className={`${styles.form__btn} ${styles.form__btn_submit}`}
        >
          Edytuj
        </button>
      </td>
      <td>
        <button
          type="button"
          onClick={() => {
            setShowEditCustomer(false);
          }}
          className={`${styles.form__btn} ${styles.form__btn_delete}`}
        >
          Usun
        </button>
      </td>
      <td>
        <button
          type="button"
          onClick={() => {
            setShowEditCustomer(false);
          }}
          className={`${styles.form__btn} ${styles.form__btn_exit}`}
        >
          Wyjdz
        </button>
      </td>
    </>
  );
}

EditCustomer.propTypes = propTypes;
