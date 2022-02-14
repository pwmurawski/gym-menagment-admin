/* eslint-disable no-param-reassign */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import FetchApi from "../../../helpers/fetchApi";
import styles from "./EditCustomer.module.css";
import ImgEdit from "../../../assets/edit.png";
import ImgDelete from "../../../assets/delete.png";
import ImgExit from "../../../assets/exit.png";

const propTypes = {
  customerData: PropTypes.object.isRequired,
  setShowEditCustomer: PropTypes.func.isRequired,
  setCustomerData: PropTypes.func.isRequired,
  discountArray: PropTypes.array.isRequired,
  ticketArray: PropTypes.array.isRequired,
  deleteCustomer: PropTypes.func.isRequired,
};

export default function EditCustomer({
  customerData,
  setShowEditCustomer,
  setCustomerData,
  discountArray,
  ticketArray,
  deleteCustomer,
}) {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [isSubmit, setIsSubmit] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [newCustomerData, setNewCustomerData] = useState({
    firstName: "",
    lastName: "",
    number: "",
    discountId: "",
    ticketType: "",
    code: "",
  });

  useEffect(() => {
    if (customerData.id) {
      setCustomerId(customerData.id);
      setNewCustomerData({
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        number: customerData.number,
        discountId: customerData.discount.id,
        code: customerData.ticket.code,
        ticketType: customerData.ticket.ticketTypeId,
      });
    }
  }, [customerData.id]);

  const submit = async () => {
    FetchApi(
      `/customer/${customerId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        signal,
        body: JSON.stringify(newCustomerData),
      },
      (res) => {
        if (res.msg.success) {
          setCustomerData({
            id: res.customer.id,
            firstName: res.customer.firstName,
            lastName: res.customer.lastName,
            number: res.customer.number,
            ticket: res.customer.ticket,
            discount: res.customer.discount,
          });
          setShowEditCustomer(false);
        }
        setIsSubmit(false);
      }
    );
  };

  useEffect(() => {
    if (isSubmit) {
      submit();
    }

    return () => {
      abortController.abort();
    };
  }, [isSubmit]);

  return (
    <>
      <td className={styles.form__item}>
        <input
          value={newCustomerData.firstName}
          onChange={(e) =>
            setNewCustomerData({
              ...newCustomerData,
              firstName: e.target.value,
            })
          }
          placeholder="Imie"
          className={`${styles.form__input} ${styles.form__input_first}`}
          type="text"
        />
      </td>
      <td className={styles.form__item}>
        <input
          value={newCustomerData.lastName}
          onChange={(e) =>
            setNewCustomerData({ ...newCustomerData, lastName: e.target.value })
          }
          placeholder="Nazwisko"
          className={styles.form__input}
          type="text"
        />
      </td>
      <td className={styles.form__item}>
        <input
          value={newCustomerData.number}
          onChange={(e) =>
            setNewCustomerData({ ...newCustomerData, number: e.target.value })
          }
          placeholder="Numer"
          className={styles.form__input}
          type="text"
        />
      </td>
      <td className={styles.form__item}>
        <input
          value={newCustomerData.code}
          onChange={(e) =>
            setNewCustomerData({ ...newCustomerData, code: e.target.value })
          }
          placeholder="Code"
          className={styles.form__input}
          type="text"
        />
      </td>
      <td className={styles.form__item}>
        <select
          value={newCustomerData.ticketType}
          onChange={(e) =>
            setNewCustomerData({
              ...newCustomerData,
              ticketType: e.target.value,
            })
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
      <td className={styles.form__item}>
        <select
          value={newCustomerData.discountId}
          onChange={(e) =>
            setNewCustomerData({
              ...newCustomerData,
              discountId: e.target.value,
            })
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
      <td className={styles.form__item}>
        <button
          type="submit"
          onClick={() => {
            setIsSubmit(true);
          }}
          className={`${styles.form__btn} ${styles.form__btn_edit}`}
        >
          <img className={styles.form__btn__icon} src={ImgEdit} alt="edit" />
          <p className={styles.tooltip}>Zapisz</p>
        </button>
      </td>
      <td className={styles.form__item}>
        <button
          type="button"
          onClick={() => {
            deleteCustomer(customerId);
          }}
          className={`${styles.form__btn} ${styles.form__btn_delete}`}
        >
          <img
            className={styles.form__btn__icon}
            src={ImgDelete}
            alt="delete"
          />
          <p className={styles.tooltip}>Usuń</p>
        </button>
      </td>
      <td className={styles.form__item}>
        <button
          type="button"
          onClick={() => {
            setShowEditCustomer(false);
          }}
          className={`${styles.form__btn} ${styles.form__btn_exit}`}
        >
          <img className={styles.form__btn__icon} src={ImgExit} alt="exit" />
          <p className={styles.tooltip}>Wyjdz</p>
        </button>
      </td>
    </>
  );
}

EditCustomer.propTypes = propTypes;
