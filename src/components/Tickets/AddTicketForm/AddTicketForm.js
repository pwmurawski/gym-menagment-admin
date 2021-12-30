import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import ReducerContext from "../../../context/Context";
import styles from "./AddTicketForm.module.css";
import FetchApi from "../../../helpers/fetchApi";

const propTypes = {
  ticketsArray: PropTypes.array.isRequired,
  setTicketsArray: PropTypes.func.isRequired,
};

export default function AddTicketForm({ ticketsArray, setTicketsArray }) {
  const initFormData = {
    name: "",
    price: "",
    activeDays: "",
    status: false,
  };

  const [ticketData, setTicketData] = useState(initFormData);
  const [backendMsg, setBackendMsg] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const stateGlobal = useContext(ReducerContext);

  const submit = async (signal) => {
    FetchApi(
      "/ticket/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal,
        body: JSON.stringify(ticketData),
      },
      (res) => {
        if (res.msg.success) {
          setTicketData(initFormData);
          setBackendMsg({
            msg: res.msg.success,
            status: true,
          });

          setTicketsArray([...ticketsArray, res.ticket]);
        }

        if (res.msg.error) {
          setBackendMsg({
            msg: res.msg.error,
            status: false,
          });
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
