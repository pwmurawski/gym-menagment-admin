import PropTypes from "prop-types";
import { useContext } from "react";
import ReducerContext from "../../../context/Context";
import useAddTicketForm from "../../../hooks/useAddTicketForm";
import styles from "./AddTicketForm.module.css";

const initFormData = {
  name: "",
  price: "",
  activeDays: "",
  status: false,
};

const propTypes = {
  ticketsArray: PropTypes.array.isRequired,
  setTicketsArray: PropTypes.func.isRequired,
};

export default function AddTicketForm({ ticketsArray, setTicketsArray }) {
  const stateGlobal = useContext(ReducerContext);
  const [ticketData, setTicketData, addTicket, backendMsg] = useAddTicketForm(
    initFormData,
    ticketsArray,
    setTicketsArray
  );

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
          addTicket();
        }}
        className={`${styles.form} ${styles[stateGlobal.state.theme] ?? ""}`}
      >
        <input
          value={ticketData.name}
          onChange={(e) =>
            setTicketData({ ...ticketData, name: e.target.value })
          }
          placeholder="Nazwa"
          className={styles.form__input}
          type="text"
        />
        <input
          value={ticketData.price}
          onChange={(e) =>
            setTicketData({ ...ticketData, price: e.target.value })
          }
          placeholder="Cena"
          className={styles.form__input}
          type="text"
        />
        <input
          value={ticketData.activeDays}
          onChange={(e) =>
            setTicketData({ ...ticketData, activeDays: e.target.value })
          }
          placeholder="Liczba dni"
          className={styles.form__input}
          type="text"
        />
        <p className={styles.status__text}>Status</p>
        <label className={styles.form__switch} htmlFor="toggleSwitch">
          <input
            checked={ticketData.status}
            onChange={(e) =>
              setTicketData({ ...ticketData, status: e.target.checked })
            }
            className={styles.form__checkbox}
            type="checkbox"
            name="toggleSwitch"
          />
          <span className={styles.form__slider} />
        </label>
        <button type="submit" className={styles.form__btn}>
          Dodaj
        </button>
      </form>
    </>
  );
}

AddTicketForm.propTypes = propTypes;
