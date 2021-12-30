import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./EditTicketForm.module.css";
import FetchApi from "../../../helpers/fetchApi";
import ImgEdit from "../../../assets/edit.png";
import ImgExit from "../../../assets/exit.png";

const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  activeDays: PropTypes.any.isRequired,
  status: PropTypes.bool.isRequired,
  setShowEditTicket: PropTypes.func.isRequired,
  ticketsArray: PropTypes.array.isRequired,
  setTicketsArray: PropTypes.func.isRequired,
};

export default function EditTicketForm({
  id,
  name,
  price,
  activeDays,
  status,
  setShowEditTicket,
  ticketsArray,
  setTicketsArray,
}) {
  const [ticketData, setTicketData] = useState({
    id,
    name,
    price,
    activeDays,
    status,
  });
  const [backendMsg, setBackendMsg] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const submit = async (signal) => {
    FetchApi(
      "/ticket/edit",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        signal,
        body: JSON.stringify(ticketData),
      },
      (res) => {
        if (res.msg.success) {
          ticketsArray.forEach((e) => {
            if (e.id === id) {
              e.id = ticketData.id;
              e.name = ticketData.name;
              e.price = ticketData.price;
              e.activeDays = ticketData.activeDays;
              e.status = ticketData.status;
            }
          });

          setTicketsArray([...ticketsArray]);
        }

        setShowEditTicket(false);
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
      <td>
        <input
          value={ticketData.name}
          onChange={(e) =>
            setTicketData({ ...ticketData, name: e.target.value })
          }
          placeholder="Nazwa"
          className={styles.form__input}
          type="text"
        />
      </td>
      <td>
        <input
          value={ticketData.price}
          onChange={(e) =>
            setTicketData({ ...ticketData, price: e.target.value })
          }
          placeholder="Cena"
          className={styles.form__input}
          type="text"
        />
      </td>
      <td>
        <input
          value={ticketData.activeDays}
          onChange={(e) =>
            setTicketData({ ...ticketData, activeDays: e.target.value })
          }
          placeholder="Dni"
          className={styles.form__input}
          type="text"
        />
      </td>
      <td>
        <label className={styles.form__switch} htmlFor="toggleSwitch">
          <input
            defaultChecked={status}
            onChange={(e) =>
              setTicketData({ ...ticketData, status: e.target.checked })
            }
            className={styles.form__checkbox}
            type="checkbox"
            name="toggleSwitch"
          />
          <span className={styles.form__slider} />
        </label>
      </td>
      <td className={styles.form__btnContainer}>
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

        <button
          type="button"
          onClick={() => {
            setShowEditTicket(false);
          }}
          className={`${styles.form__btn} ${styles.form__btn_exit}`}
        >
          <img className={styles.form__btn__icon} src={ImgExit} alt="edit" />
          <p className={styles.tooltip}>Wyjdz</p>
        </button>
      </td>
    </>
  );
}

EditTicketForm.propTypes = propTypes;
