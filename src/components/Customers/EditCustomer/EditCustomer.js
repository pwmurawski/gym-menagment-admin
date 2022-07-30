/* eslint-disable no-param-reassign */
import PropTypes from "prop-types";
import { useContext } from "react";
import styles from "./EditCustomer.module.css";
import ImgEdit from "../../../assets/edit.png";
import ImgDelete from "../../../assets/delete.png";
import ImgExit from "../../../assets/exit.png";
import HomeContext from "../../../context/HomeContext";
import useDeleteCustomer from "../../../hooks/useDeleteCustomer";
import useEditCustomer from "../../../hooks/useEditCustomer";

const initialState = {
  firstName: "",
  lastName: "",
  number: "",
  discountId: "",
  ticketType: "",
  code: "",
};

const propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  ticket: PropTypes.object.isRequired,
  discount: PropTypes.object.isRequired,
  setShowEditCustomer: PropTypes.func.isRequired,
};

export default function EditCustomer({
  id,
  firstName,
  lastName,
  number,
  ticket,
  discount,
  setShowEditCustomer,
}) {
  const homeCon = useContext(HomeContext);
  const { discountsArray, ticketsArray } = homeCon.stateH;
  const deleteCustomer = useDeleteCustomer();
  const [newCustomerData, setNewCustomerData, editCustomer] = useEditCustomer(
    initialState,
    {
      id,
      firstName,
      lastName,
      number,
      ticket,
      discount,
    }
  );

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
          {ticketsArray?.map((ticketEl) => (
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
          {discountsArray?.map((discountEl) => (
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
            editCustomer();
            setShowEditCustomer(false);
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
            deleteCustomer(id);
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
