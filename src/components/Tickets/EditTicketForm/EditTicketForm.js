import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./EditTicketForm.module.css";
import FetchApi from "../../../helpers/fetchApi";
import ImgEdit from "../../../assets/edit.png";
import ImgExit from "../../../assets/exit.png";

const propTypes = {
  ticketData: PropTypes.object.isRequired,
  setTicketData: PropTypes.func.isRequired,
  setShowEditTicket: PropTypes.func.isRequired,
};

export default function EditTicketForm({
  ticketData,
  setTicketData,
  setShowEditTicket,
}) {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [backendMsg, setBackendMsg] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [newTicketData, setNewTicketData] = useState({
    id: null,
    name: "",
    price: "",
    activeDays: "",
    status: false,
  });

  useEffect(() => {
    if (ticketData.id) {
      setNewTicketData(ticketData);
    }
  }, [ticketData.id]);

  const submit = async () => {
    FetchApi(
      "/ticket/edit",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        signal,
        body: JSON.stringify(newTicketData),
      },
      (res) => {
        if (res.msg.success) {
          setTicketData(newTicketData);
        }
        setShowEditTicket(false);
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
          value={newTicketData.name}
          onChange={(e) =>
            setNewTicketData({ ...newTicketData, name: e.target.value })
          }
          placeholder="Nazwa"
          className={styles.form__input}
          type="text"
        />
      </td>
      <td>
        <input
          value={newTicketData.price}
          onChange={(e) =>
            setNewTicketData({ ...newTicketData, price: e.target.value })
          }
          placeholder="Cena"
          className={styles.form__input}
          type="text"
        />
      </td>
      <td>
        <input
          value={newTicketData.activeDays}
          onChange={(e) =>
            setNewTicketData({ ...newTicketData, activeDays: e.target.value })
          }
          placeholder="Dni"
          className={styles.form__input}
          type="text"
        />
      </td>
      <td>
        <label className={styles.form__switch} htmlFor="toggleSwitch">
          <input
            checked={newTicketData.status}
            onChange={(e) =>
              setNewTicketData({ ...newTicketData, status: e.target.checked })
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
