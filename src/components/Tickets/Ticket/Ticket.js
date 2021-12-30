import PropTypes from "prop-types";
import { useContext, useState } from "react";
import styles from "./Ticket.module.css";
import ReducerContext from "../../../context/Context";
import EditTicketForm from "../EditTicketForm/EditTicketForm";

const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  activeDays: PropTypes.any.isRequired,
  status: PropTypes.bool.isRequired,
  ticketsArray: PropTypes.array.isRequired,
  setTicketsArray: PropTypes.func.isRequired,
};

export default function Ticket({
  id,
  name,
  price,
  activeDays,
  status,
  ticketsArray,
  setTicketsArray,
}) {
  const [showEditTicket, setShowEditTicket] = useState(false);
  const stateGlobal = useContext(ReducerContext);

  return (
    <tr
      onDoubleClick={() => {
        setShowEditTicket(true);
      }}
      className={`${styles.ticket} ${styles[stateGlobal.state.theme] ?? ""} ${
        showEditTicket ? styles.editTicket : null
      }`}
    >
      {showEditTicket ? (
        <EditTicketForm
          id={id}
          name={name}
          price={price}
          activeDays={activeDays}
          status={status}
          ticketsArray={ticketsArray}
          setTicketsArray={setTicketsArray}
          setShowEditTicket={setShowEditTicket}
        />
      ) : (
        <>
          <td>{name}</td>
          <td>{`${price} zł`}</td>
          <td>{`${activeDays} ${
            parseFloat(activeDays) === 1 ? "dzień" : "dni"
          }`}</td>
          <td className={styles.container__ticketStatus}>
            <div
              className={`${styles.ticket__status} ${
                status
                  ? styles.ticket__status_active
                  : styles.ticket__status_notActive
              }`}
            />
          </td>
        </>
      )}
    </tr>
  );
}

Ticket.propTypes = propTypes;
