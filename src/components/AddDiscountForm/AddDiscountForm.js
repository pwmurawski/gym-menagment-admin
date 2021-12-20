import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import styles from "./AddDiscountForm.module.css";
import ReducerContext from "../../context/Context";
import FetchApi from "../../helpers/fetchApi";

const propTypes = {
  discountsArray: PropTypes.array.isRequired,
  setDiscountsArray: PropTypes.func.isRequired,
};

export default function AddDiscountForm({ discountsArray, setDiscountsArray }) {
  const initFormData = {
    name: "",
    discount: "",
    status: "",
  };

  const [discountData, setDiscountData] = useState(initFormData);
  const [backendMsg, setBackendMsg] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const stateGlobal = useContext(ReducerContext);

  const submit = async (signal) => {
    FetchApi(
      "/discount/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal,
        body: JSON.stringify(discountData),
      },
      (res) => {
        if (res.msg.success) {
          setDiscountData(initFormData);
          setBackendMsg({
            msg: res.msg.success,
            status: true,
          });

          setDiscountsArray([...discountsArray, res.discount]);
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
          value={discountData.name}
          onChange={(e) =>
            setDiscountData({ ...discountData, name: e.target.value })
          }
          placeholder="Nazwa"
          className={styles.form__input}
          type="text"
        />
        <input
          value={discountData.discount}
          onChange={(e) =>
            setDiscountData({ ...discountData, discount: e.target.value })
          }
          placeholder="Zniżka"
          className={styles.form__input}
          type="text"
        />
        <input
          value={discountData.status}
          onChange={(e) =>
            setDiscountData({ ...discountData, status: e.target.value })
          }
          placeholder="Status"
          className={styles.form__input}
          type="text"
        />
        <button type="submit" className={styles.form__btn}>
          Dodaj
        </button>
      </form>
    </>
  );
}

AddDiscountForm.propTypes = propTypes;
